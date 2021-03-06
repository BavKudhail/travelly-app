const { Schema, model } = require('mongoose');

const activityBadgeSchema = new Schema({
  badgeName: {
    type: String,
    required: true,
    unique: true,
  },
  badgeImage: {
    type: String,
    // unique: true,
    // ! removed just for testing purposes
  },
  activities: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Activity',
    },
  ],
});

const ActivityBadge = model('ActivityBadge', activityBadgeSchema);

module.exports = ActivityBadge;
