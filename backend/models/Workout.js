const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    workoutRoutine: {type: String, required: true},
    workoutActivity: {type: String },
    workoutDuration: {type: Number}
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;