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
            console.log(user);

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
        
        for (const entry in intakeData)
        {
            console.log('Nutritional Data', entry);
        }
        
        console.log('Nutritional Data', intakeData);

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