const Nutrition = require('../models/Nutrition');
const Activity = require('../models/Activity');
const User = require('../models/User');
const Workout = require('../models/Workout');

//Factory function
function createModel(modelType,data) {
  
    switch (modelType) {
        case 'user' :
            return new User(data);
        case 'nutrition':
            return new Nutrition(data);
        case 'activity':
            return new Activity(data);
        case 'workout' :
            return new Workout(data);
        default: 
            throw new Error("Invalid model type");
    }
}

module.exports = createModel;
