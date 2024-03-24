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
        this.totaWater = 0;
        this.totalCalories = 0;
        this.totalBurn = 0;
        this.totalNet = 0;
        
    }

    async fetchAndUpdateCalories(/*timePeriod*/){

        /* const startDate;
        switch(timePeriod)
            case 'day' */
        
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
            const user = userResponse.data.user;
            

            const endDate = moment().format('YYYY-MM-DD');
            const startDate = moment().subtract(1, 'months').format('YYYY-MM-DD');

            console.log('startDate',startDate);
            console.log('endDate',endDate);
            console.log('user:', user);
            

            const intakeResponse = await axios.get('http://localhost:5000/api/auth/nutritionIntake', {
            params: {
                user,
                startDate,
                endDate
            }
        });

            const intakeData = await intakeResponse.data;
            let totalCalories = 0;
            let totalWater = 0;
            let totalBurn = 1000;
        
        for (const entry of intakeData)
        {
            totalCalories += entry.calorieIntake;
            totalWater += entry.waterIntake;
            
        }
        
        this.totalCalories = totalCalories;
        this.totalWater = totalWater;
        this.totalBurn = totalBurn;
        this.totalNet = totalCalories - totalBurn;
        

        this.notifyObservers();

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }

    notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this.totalCalories,this.totalWater,this.totalBurn,this.totalNet);/*,this.calorieBurn,this.waterIntake*/
        }
    }
}

//Observer interface expects an update function
// function update(calories){}

const calorieTrackerInstance = new CalorieTracker();
export default calorieTrackerInstance;