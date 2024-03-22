import React from 'react';
import axios from 'axios';
import moment from 'moment';

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
            const token = localStorage.getItem('token');
                if (!token){
                    console.log("No token found");
                    return;
                }
                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                };
                
            const userResponse = await axios.get('http://localhost:5000/api/auth/userRetrieval', config);
            const user = userResponse.data.user._id;

            const endDate = moment().format('YYYY-MM-DD');
            const startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');

            console.log('startDate',startDate);
            console.log('user:', user);
            

            const intakeResponse = await axios.get('http://localhost:5000/api/auth/nutritionIntake', {
            params: {
                user,
                startDate,
                endDate
            }
        });

            const intakeData = await intakeResponse.data;
        
        //console.log('Nutritional Data', intakeData);

        for (const calories in intakeData){
            this.calorieIntake += calories;
        }
        //this.calorieBurn = burnData.calorieBurn;
        //this.waterIntake = intakeData.waterIntake;
        this.notifyObservers();
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.calorieIntake/*,this.calorieBurn,this.waterIntake*/);
        }
    }
}

//Observer interface expects an update function
// function update(calories){}

export default CalorieTracker;