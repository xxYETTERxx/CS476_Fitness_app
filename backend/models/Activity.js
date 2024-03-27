const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    caloriesBurned: {type: Number, default: 0},
    date: { type: Date, default: Date.now }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;