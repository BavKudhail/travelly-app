const { Schema, model } = require('mongoose');

const activitySchema = new Schema(
  {
    activityName: {
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

const Activity = model('Activity', activitySchema);

module.exports = Activity;
