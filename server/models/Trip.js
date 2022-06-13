const { Schema, model } = require("mongoose");
const moment = require("moment");

const tripSchema = new Schema(
  {
    tripName: {
      type: String,
      required: true,
      unique: true,
    },
    tripDescription: {
      type: String,
      required: true,
    },
    countries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Country",
      },
    ],
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
    ],
    // image using s3?
    imageUrl: {
      type: String,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    travellers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Traveller",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// function to return travellers count -- travellers to be declared in typeDefs?
tripSchema.virtual("travellersCount").get(function () {
  return this.travellers.length;
});

// !Add duration virtual

const Trip = model("Trip", tripSchema);

module.exports = Trip;
