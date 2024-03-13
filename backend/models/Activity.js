const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    activity: {type: String},
    caloriesBurned: {type: Number, default: 0}
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;