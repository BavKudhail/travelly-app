const { Schema, model } = require("mongoose");

const countryBadgeSchema = new Schema({
  badgeName: {
    type: String,
    required: true,
    unique: true,
  },
  badgeImage: {
    type: String,
    unique: true,
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
