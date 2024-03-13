const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    activity: {type: "string"},
    caloriesBurned: {type: int},
});

const Nutrition = mongoose.model('Activity', nutritionSchema);

module.exports = Activity;