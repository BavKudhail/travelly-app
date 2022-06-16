const { Schema, model } = require("mongoose");

const countrySchema = new Schema(
  {
    countryName: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Country = model("Country", countrySchema);

module.exports = Country;
