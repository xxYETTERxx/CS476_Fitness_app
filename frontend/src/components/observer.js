import React from 'react';
import axios from 'axios';

class Subject {
    constructor() {
        this.observers = [];
    }

    subscribe(observer){
        this.observers.push(observer); 
    }

    unsubscribe(observer) {
        this.observers = this.observers.filter(sub => sub !== observer)
    }
}

class CalorieTracker extends Subject {
    constructor() {
        super();
        this.waterIntake = 0;
        this.calorieIntake = 0;
        this.calorieBurn = 0;
        
    }

    async fetchAndUpdateCalories(){
        
        try {
            const intakeResponse = await fetch('http://localhost:5000/api/auth/nutritionIntake');
            const burnResponse = await fetch('http://localhost:5000/api/auth/calorieBurn');
            const intakeData = await intakeResponse.json();
            const burnData = await burnResponse.json();
        

        this.calorieIntake = intakeData.calorieIntake;
        this.calorieBurn = burnData.calorieBurn;
        this.waterIntake = intakeData.waterIntake;
        this.notifyObservers();
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.calories);
        }
    }
}

//Observer interface expects an update function
// function update(calories){}

export default CalorieTracker;