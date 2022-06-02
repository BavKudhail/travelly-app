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
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");

const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log("hello");
    },
  },
  Mutation: {
    //////////////////////////////////////
    //////////////SIGNUP//////////////////
    //////////////////////////////////////

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
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

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      const token = signToken(user);
      console.log(user);
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
      console.log(company);
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
      console.log(admin);
      return { token, admin };
    },

    //////////////////////////////////////
    /////////COMPANY FUNCTIONS////////////
    //////////////////////////////////////

    addTrip: async (parent, args) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user isCompanyAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const trip = await Trip.create(args);

      //////////RETURN VALUE///////////////
      return trip;
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
    addPost: async (parent, { userId, postText }) => {
      //////////AUTH SECTION///////////////
      // TODO: add authorisation to check if current user has access to the post (maybe use context?)

      //////////PROCESSING/////////////////
      const post = await Post.create({ userId, postText });
      const user = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            posts: post._id,
          },
        },
        { new: true, runValidators: true }
      );

      //////////RETURN VALUE///////////////
      return user
        .populate({
          path: "posts",
          model: "Post",
        })
        .execPopulate();
    },

    // ! Need to refactor to use context to get userId rather than passing it in in the args
    addComment: async (parent, { userId, postId, commentText }) => {
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
              userId,
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
  },
};

module.exports = resolvers;
