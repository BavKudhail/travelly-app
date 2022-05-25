const { Schema, model } = require('mongoose');

const countrySchema = new Schema(
  {
    countryName: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

const Country = model('Country', countrySchema);

module.exports = Country;
