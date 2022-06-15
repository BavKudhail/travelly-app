const { Schema, model } = require("mongoose");

const countryBadgeSchema = new Schema({
  badgeName: {
    type: String,
    required: true,
    unique: true,
  },
  // ! Laura - removed unique from badgeImage
  badgeImage: {
    type: String,
  },
  countries: [
    {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
  ],
});

const CountryBadge = model("CountryBadge", countryBadgeSchema);

module.exports = CountryBadge;
