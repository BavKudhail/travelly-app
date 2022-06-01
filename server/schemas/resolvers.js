const {
  User,
  Trip,
  Activity,
  ActivityBadge,
  Company,
  Admin,
} = require("../models");
const { AuthenticationError } = require("apollo-server-express");

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
      // !Add token back
      return user;
    },
    addCompany: async (parent, args) => {
      const company = await Company.create(args);
      // !Add token back
      return company;
    },
    addAdmin: async (parent, args) => {
      const admin = await Admin.create(args);
      // !Add token back
      return admin;
    },

    //////////////////////////////////////
    //////////////LOGIN///////////////////
    //////////////////////////////////////

    loginUser: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Email not found!");
      }
      // !add token back
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      // return {token, user } here
      console.log(user);
      return user;
    },

    loginCompany: async (parent, { email, password }) => {
      const company = await Company.findOne({ email });
      if (!company) {
        throw new AuthenticationError("Email not found!");
      }
      // !add token back
      const correctPw = await company.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      // return {token, user } here
      console.log(company);
      return company;
    },

    loginAdmin: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new AuthenticationError("Email not found!");
      }
      // !add token back
      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }
      // return {token, user } here
      console.log(admin);
      return admin;
    },

    addTrip: async (parent, args) => {
      //////////AUTH SECTION///////////////
      // ? Auth:
      // TODO: add authorisation to check if current user isCompanyAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const trip = await Trip.create(args);

      //////////RETURN VALUE///////////////
      return trip;
    },
    addActivity: async (parent, args) => {
      //////////AUTH SECTION///////////////
      // ? Auth:
      // TODO: add authorisation to check if current user isCompanyAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const activity = await Activity.create(args);

      //////////RETURN VALUE///////////////
      return activity;
    },
    // Laura
    addActivityBadge: async (parent, { badgeName, badgeImage, activities }) => {
      //////////AUTH SECTION///////////////
      // ? Auth:
      // TODO: add authorisation to check if current user isAdmin (maybe use context?)

      //////////PROCESSING/////////////////
      const activityBadge = await ActivityBadge.create({
        badgeName,
        badgeImage,
      });

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
  },
};

module.exports = resolvers;
