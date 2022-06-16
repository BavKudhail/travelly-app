const {
  User,
  Trip,
  Activity,
  ActivityBadge,
  Country,
  CountryBadge,
  Company,
  Admin,
  Post,
  Comment,
  Chat,
  Message,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");

// Bav Kudhail ID - 6297844e0f3fb256b41ad4f2

const chatData = require("../data/data");

const { signToken } = require("../utils/auth");
const { isConstValueNode } = require("graphql");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const user = User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return user
          .populate("following")
          .populate("followers")
          .populate("posts")
          .populate("savedCountryBadges")
          .populate("savedActivityBadges")
          .populate("upcomingTrips")
          .populate("countries");
      }
    },

    getUser: async (parent, { userId }, context) => {
      const user = User.findById({ _id: userId });
      return user
        .populate("following")
        .populate("followers")
        .populate("posts")
        .populate("savedCountryBadges")
        .populate("savedActivityBadges")
        .populate("upcomingTrips")
        .populate("countries");
    },

    getFollowingPosts: async (me, args, context) => {
      // get the currently logged in user
      if (context.user) {
        const user = User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return user.populate({
          path: "following",
          model: "User",
          populate: {
            path: "posts",
            model: "Post",
            populate: {
              path: "postedBy",
              model: "User",
            },
          },
        });
      }
    },

    getAllTrips: async (parent, args, context) => {
      const trips = await Trip.find().populate("countries");
      return trips;
    },

    getCompanyTrips: async (parent, args, context) => {
      const trips = Trip.find({ companyId: context.user._id })
        .populate("countries")
        .populate("activities");

      return trips;
    },

    getUserBucketList: async (parent, args, context) => {
      const user = await User.findById({ _id: context.user._id });

      return user
        .populate({
          path: "savedCountryBadges",
          model: "CountryBadge",
        })
        .execPopulate();
    },

    getAllCountries: async (parent, args, context) => {
      const country = await Country.find();
      return country;
    },

    getAllActivities: async (parent, args, context) => {
      const activities = await Activity.find();
      return activities;
    },

    //////////////////////////////////////
    ////////////// CHAT //////////////////
    //////////////////////////////////////

    // get all messages
    getAllMessages: async (parent, { chatId }, context) => {
      // get all messages based on the chat ID
      const messages = await Message.find({ chat: chatId })
        .populate("sender")
        .populate("chat");
      return messages;
    },
    // get all group chats that the specific user is a part of

    getGroupChats: async (parent, args, context) => {
      if (context.user) {
        const chats = await Chat.find({
          // find all chats that the logged in user is a part of
          users: { $elemMatch: { $eq: context.user._id } },
        })
          .populate("groupAdmin")
          .populate("users")
          .populate("latestMessage");
        console.log("chats", chats);
        return chats;
      }
    },

    //////////////////////////////////////
    ////////////// BADGES ////////////////
    //////////////////////////////////////

    // ******
    getAllCountryBadges: async (parent, args, context) => {
      const allCountryBadges = await CountryBadge.find({}).populate(
        "countries"
      );

      return allCountryBadges;
    },

    getAllActivityBadges: async (parent, args, context) => {
      const allActivityBadges = await ActivityBadge.find({}).populate(
        "activities"
      );

      return allActivityBadges;
    },

    //////////////////////////////////////
    ////////////// POSTS /////////////////
    //////////////////////////////////////

    getAllPosts: async (parent, args, context) => {
      const allPosts = await Post.find({})
        .populate("postedBy")
        .populate("comments");

      return allPosts;
    },
  },
  // ****
  Mutation: {
    //////////////////////////////////////
    ////////////// CHAT //////////////////
    //////////////////////////////////////

    // create new message
    sendMessage: async (parent, { content, chatId }, context) => {
      const newMessage = await Message.create({
        // the sender of the message is the currently logged in user
        sender: context.user._id,
        content,
        chat: chatId,
      });
      // get the message
      const updatedMessage = await Message.findById({
        _id: newMessage._id,
      })
        .populate("sender")
        .populate("chat");

      // update the latest message with the sent message
      const updateLatestMessage = await Chat.findByIdAndUpdate(
        { _id: chatId },
        { latestMessage: updatedMessage }
      );

      return updatedMessage;
    },
    // create group chat
    createGroupChat: async (parent, { chatName, userId }, context) => {
      // static user ID - change to logged in user
      const loggedInUser = await User.findById({
        _id: userId,
      });

      return chat;
    },

    // add a user to the group chat
    addUserToGroupChat: async (parent, { chatId, userId }, context) => {
      // get the logged in user (static for now)
      const loggedInUser = await User.findById({
        _id: userId,
      });
      // find the chat by its id
      const updatedChat = await Chat.findByIdAndUpdate(
        { _id: chatId },
        // push the loggedInUser to the users array
        { $push: { users: loggedInUser } }
      ).populate("users");
      return updatedChat;
    },

    //////////////////////////////////////
    //////////////SIGNUP//////////////////
    //////////////////////////////////////

    addUser: async (parent, args) => {
      const user = await User.create(args);
      // generate token
      const token = signToken(user);
      return { token, user };
    },
    // ***
    addCompany: async (parent, args) => {
      const company = await Company.create(args);

      const token = signToken(company);
      return { token, company };
    },
    addAdmin: async (parent, args) => {
      const admin = await Admin.create(args);

      const token = signToken(admin);
      return { token, admin };
    },

    //////////////////////////////////////
    //////////////LOGIN///////////////////
    //////////////////////////////////////

    loginUser: async (parent, { email, password }, context) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);

      return { token, user };
    },

    loginCompany: async (parent, { email, password }) => {
      const company = await Company.findOne({ email });
      if (!company) {
        throw new AuthenticationError("Email not found!");
      }

      const correctPw = await company.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(company);

      return { token, company };
    },

    loginAdmin: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new AuthenticationError("Email not found!");
      }

      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(admin);

      return { token, admin };
    },

    //////////////////////////////////////
    /////////COMPANY FUNCTIONS////////////
    //////////////////////////////////////

    addTrip: async (
      parent,
      { tripName, tripDescription, startDate, endDate, countries, activities },
      context
    ) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user isCompanyAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const trip = await Trip.create({
        tripName,
        tripDescription,
        startDate,
        endDate,
        companyId: context.user._id,
      });

      // ===================== create a chat ========================

      const chat = await Chat.create({
        chatName: tripName + " " + "Chat",
        groupAdmin: context.user._id,
        tripId: trip._id,
      });

      const updatedTrip = await Trip.findByIdAndUpdate(
        { _id: trip._id },
        {
          $addToSet: {
            countries: {
              // Adding each Country id to the countries set on the badge
              $each: countries.map((country) => {
                return Country.findById(country)._conditions._id;
              }),
            },
          },
          // create a chatId value set to the newly created chats ID
          $set: { chatId: chat._id },
        },
        { new: true, runValidators: true }
      );

      console.log(chat._id);

      const newUpdatedTrip = await Trip.findByIdAndUpdate(
        { _id: trip._id },
        {
          $addToSet: {
            activities: {
              // Adding each Country id to the countries set on the badge
              $each: activities.map((activity) => {
                return Activity.findById(activity)._conditions._id;
              }),
            },
          },
        },

        { new: true, runValidators: true }
      );

      const company = await Company.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { trips: trip._id } },
        { new: true, runValidators: true }
      );
      //////////RETURN VALUE///////////////
      // const returnCompany = Company.findOne({ _id: companyId });
      return company
        .populate({
          path: "trips",
          model: "Trip",
          populate: {
            path: "countries",
            model: "Country",
          },
          populate: {
            path: "activities",
            model: "Activity",
          },
        })
        .execPopulate();
    },

    updateTrip: async (
      parent,
      { tripName, tripDescription, startDate, endDate, tripId },
      context
    ) => {
      const trip = Trip.findByIdAndUpdate(
        { _id: tripId },
        { tripName, tripDescription, startDate, endDate },
        { new: true, runValidators: true }
      );

      return trip;
    },

    deleteTrip: async (parent, { tripId }, context) => {
      console.log(tripId);
      const deletedTrip = await Trip.findByIdAndDelete({ _id: tripId });

      return deletedTrip;
    },

    addActivity: async (parent, args) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user isCompanyAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const activity = await Activity.create(args);

      //////////RETURN VALUE///////////////
      return activity;
    },
    addCountry: async (parent, args) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user isCompanyAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const country = await Country.create(args);

      //////////RETURN VALUE///////////////
      return country;
    },

    //////////////////////////////////////
    /////////ADMIN FUNCTIONS////////////
    //////////////////////////////////////

    addActivityBadge: async (parent, { badgeName, badgeImage, activities }) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user isAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const activityBadge = await ActivityBadge.create({
        badgeName,
        badgeImage,
      });

      // ! Check if this can be refactored to use the activityBadge variable above rather than finding by _id again
      const updatedActivityBadge = await ActivityBadge.findByIdAndUpdate(
        { _id: activityBadge._id },
        {
          $addToSet: {
            activities: {
              // Adding each activity id to the activities set on the badge
              $each: activities.map((activity) => {
                return Activity.findById(activity)._conditions._id;
              }),
            },
          },
        },
        { new: true, runValidators: true }
      );
      //////////RETURN VALUE///////////////
      // Returning the populated activityBadge
      return updatedActivityBadge
        .populate({
          path: "activities",
          model: "Activity",
        })
        .execPopulate();
    },

    addCountryBadge: async (parent, { badgeName, badgeImage, countries }) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user isAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const countryBadge = await CountryBadge.create({
        badgeName,
        badgeImage,
      });

      // ! Check if this can be refactored to use the CountryBadge variable above rather than finding by _id again
      const updatedCountryBadge = await CountryBadge.findByIdAndUpdate(
        { _id: countryBadge._id },
        {
          $addToSet: {
            countries: {
              // Adding each Country id to the countries set on the badge
              $each: countries.map((country) => {
                return Country.findById(country)._conditions._id;
              }),
            },
          },
        },
        { new: true, runValidators: true }
      );
      //////////RETURN VALUE///////////////
      // Returning the populated CountryBadge
      return updatedCountryBadge
        .populate({
          path: "countries",
          model: "Country",
        })
        .execPopulate();
    },

    //////////////////////////////////////
    /////////USER FUNCTIONS///////////////
    //////////////////////////////////////

    // ! Need to refactor to use context to get userId rather than passing it in in the args
    addPost: async (parent, { postText, postTitle }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user can create posts (i.e not company or admin)

      //////////PROCESSING/////////////////
      const post = await Post.create({
        postedBy: context.user._id,
        postText,
        postTitle,
      });

      const updatedPost = await Post.findById({
        _id: post._id,
      }).populate("postedBy");

      // add to the users posts array
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        {
          $addToSet: {
            posts: post._id,
          },
        },
        { new: true, runValidators: true }
      ).populate("posts");

      //////////RETURN VALUE///////////////

      return updatedPost;
    },

    deletePost: async (parent, { postId }, context) => {
      const deletedPost = await Post.findByIdAndDelete({ _id: postId });

      return deletedPost;
    },

    // ! Need to refactor to use context to get userId rather than passing it in in the args
    addComment: async (parent, { postId, commentText }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user has access to the post (maybe use context?)

      //////////PROCESSING/////////////////
      // Adding the new comment to the comment set on the post with the id of postId
      const post = await Post.findByIdAndUpdate(
        { _id: postId },
        {
          $addToSet: {
            // ? Could do with refactoring so that userId is actually a nested User as opposed to just the id
            comments: {
              userId: context.user._id,
              postId,
              commentText,
            },
          },
        },
        { new: true, runValidators: true }
      );

      //////////RETURN VALUE///////////////
      return post;
    },

    // ! Need to refactor to use context to get userId rather than passing it in in the args
    // Adds a country badge to users savedCountryBadges
    saveCountryBadge: async (parent, { badgeId }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if user is logged in and auth to save badges (i.e not a company or admin)

      //////////PROCESSING/////////////////
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedCountryBadges: badgeId } },
        { new: true, runValidators: true }
      );

      //////////RETURN VALUE///////////////
      return (
        user
          .populate({
            path: "savedCountryBadges",
            model: "CountryBadge",
            populate: {
              path: "countries",
              model: "Country",
            },
          })
          // .populate({
          //   path: "savedActivityBadges",
          //   model: "ActivityBadge",
          //   populate: {
          //     path: "activities",
          //     model: "Activity",
          //   },
          // })
          .execPopulate()
      );
    },

    // REmoves a country badge to users savedCountryBadges
    removeCountryBadge: async (parent, { badgeId }, context) => {
      //////////PROCESSING/////////////////
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedCountryBadges: badgeId } },
        { new: true, runValidators: true }
      );

      //////////RETURN VALUE///////////////
      return user
        .populate({
          path: "savedCountryBadges",
          model: "CountryBadge",
          populate: {
            path: "countries",
            model: "Country",
          },
        })
        .execPopulate();
    },

    // ! Need to refactor to use context to get userId rather than passing it in in the args
    // Adds an activity badge to users savedActivityBadges
    saveActivityBadge: async (parent, { badgeId }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if user is logged in and auth to save badges (i.e not a company or admin)

      //////////PROCESSING/////////////////
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedActivityBadges: badgeId } },
        { new: true, runValidators: true }
      );

      //////////RETURN VALUE///////////////
      return user
        .populate({
          path: "savedActivityBadges",
          model: "ActivityBadge",
          populate: {
            path: "activities",
            model: "Activity",
          },
        })
        .populate({
          path: "savedCountryBadges",
          model: "CountryBadge",
          populate: {
            path: "countries",
            model: "Country",
          },
        })
        .execPopulate();
    },

    // Adds a trip to users upcomingTrips array
    userGoing: async (parent, { tripId }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if user is logged in and auth to save badges (i.e not a company or admin)

      //////////PROCESSING/////////////////
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { upcomingTrips: tripId } },
        { new: true, runValidators: true }
      );

      const trip = await Trip.findByIdAndUpdate(
        { _id: tripId },
        { $addToSet: { travellers: context.user._id } },
        { new: true, runValidators: true }
      );

      // add user to group chat :-)
      const updatedChat = await Chat.findByIdAndUpdate(
        { _id: trip.chatId },
        { $push: { users: user } }
      );
      console.log("trip", trip);

      //////////RETURN VALUE///////////////
      return trip;
      // .populate({
      //   path: "upcomingTrips",
      //   model: "Trip",
      //   populate: {
      //     path: "countries",
      //     model: "Country",
      //   },
      // })
      // .execPopulate();
    },

    leaveTrip: async (parent, { tripId }, context) => {
      //////////PROCESSING/////////////////
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { upcomingTrips: tripId } },
        { new: true, runValidators: true }
      );

      const trip = await Trip.findByIdAndUpdate(
        { _id: tripId },
        { $pull: { travellers: context.user._id } },
        { new: true, runValidators: true }
      );

      // remove user from group chat
      const updatedChat = await Chat.findByIdAndUpdate(
        { _id: trip.chatId },
        { $pull: { users: user._id } }
      );

      console.log("user id", user._id);
      console.log("updated chat:", updatedChat);

      //////////RETURN VALUE///////////////
      return trip;
    },

    followUser: async (parent, { userId }, context) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if user is logged in and auth to save badges (i.e not a company or admin)

      //////////PROCESSING/////////////////
      const userLoggedIn = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $addToSet: { following: userId } },
        { new: true, runValidators: true }
      );

      const user = await User.findByIdAndUpdate(
        { _id: userId },
        { $addToSet: { followers: context.user._id } },
        { new: true, runValidators: true }
      );
      //////////RETURN VALUE///////////////
      return userLoggedIn
        .populate({
          path: "following",
          model: "User",
        })
        .populate({ path: "followers", model: "User" })
        .execPopulate();
    },

    migratePastTrips: async (parent, args, context) => {
      const user = await User.findById({ _id: context.user._id });

      return user
        .populate({
          path: "upcomingTrips",
          model: "Trip",
          populate: {
            path: "countries",
            model: "Country",
          },
        })

        .execPopulate();
    },
  },
};

module.exports = resolvers;
