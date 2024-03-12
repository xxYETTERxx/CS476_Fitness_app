const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    calorieIntake: {type: int},
    waterIntake: {type: int},

});

const Nutrition = mongoose.model('Nutrition', nutritionSchema);

module.exports = Nutrition;