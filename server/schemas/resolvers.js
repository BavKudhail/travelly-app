const { User, Trip, Activity, ActivityBadge, Country, CountryBadge, Company, Admin, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      console.log('hello');
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
        throw new AuthenticationError('Email not found!');
      }
      // !add token back
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      // return {token, user } here
      console.log(user);
      return user;
    },

    loginCompany: async (parent, { email, password }) => {
      const company = await Company.findOne({ email });
      if (!company) {
        throw new AuthenticationError('Email not found!');
      }
      // !add token back
      const correctPw = await company.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      // return {token, user } here
      console.log(company);
      return company;
    },

    loginAdmin: async (parent, { email, password }) => {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        throw new AuthenticationError('Email not found!');
      }
      // !add token back
      const correctPw = await admin.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }
      // return {token, user } here
      console.log(admin);
      return admin;
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

      // ! Check is this can be refactored to use the activityBadge variable above rather than finding by _id again
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
          path: 'activities',
          model: 'Activity',
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
          path: 'countries',
          model: 'Country',
        })
        .execPopulate();
    },

    //////////////////////////////////////
    /////////USER FUNCTIONS///////////////
    //////////////////////////////////////

    addPost: async (parent, args) => {
      const post = await Post.create(args);
      return post;
    },

    addComment: async (parent, args) => {
      const comment = await Comment.create(args);
      return comment;
    },
  },
};

module.exports = resolvers;
