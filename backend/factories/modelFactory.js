const Nutrition = require('../models/Nutrition');
const Activity = require('../models/Activity');

//Factory function
function createModel(modelType) {
    switch (modelType, data) {
        case 'nutrition':
            return new Nutrition(data.user, data.calorieIntake, data.waterIntake);
        case 'activity':
            return new Activity(data.user);
        default: 
            throw new Error("Invalid model type");
    }
}