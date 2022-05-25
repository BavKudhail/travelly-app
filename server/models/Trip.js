const { Schema, model } = require('mongoose');

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
        ref: 'Country',
      },
    ],
    activities: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Activity',
      },
    ],
    // image using s3?
    imageUrl: {
      type: Image,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    travellers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Traveller',
      },
    ],
    duration: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// function to return travellers count -- travellers to be declared in typeDefs?
tripSchema.virtual('travellersCount').get(function () {
  return this.travellers.length;
});

const Trip = model('Trip', tripSchema);

module.exports = Trip;
