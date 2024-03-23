const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    title: {type: String, required: true},
    description: {type: String }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;