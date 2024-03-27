const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    calorieIntake: { type: Number, default: 0 },
    waterIntake: { type: Number, default: 0 },
    date: { type: Date, default: Date.now }
});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;