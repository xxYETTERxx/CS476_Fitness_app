const Nutrition = require('../models/Nutrition');
const Activity = require('../models/Activity');
const User = require('../models/User');

//Factory function
function createModel(modelType,data) {
    console.log("create model running");
    switch (modelType) {
        case 'user' :
            return new User(data);
        case 'nutrition':
            return new Nutrition(data);
        case 'activity':
            return new Activity(data);
        default: 
            throw new Error("Invalid model type");
    }
}

module.exports = createModel;
