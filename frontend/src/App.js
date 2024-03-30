import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CalorieCalculator from './components/CalorieCalculator';
import NutritionalTracker from './components/NutritionalTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import axios from 'axios'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nutritionActive, setNutritionActive] = useState(false);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [activityActive, setActivityActive] = useState(false);

useEffect(() =>{
        //retrieve user data
        const checkUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token){
                    console.log("No token found");
                    return;
                }
                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                };
                
                const response = await axios.get('https://gymgenius-api.onrender.com/api/auth/userRetrieval', config);
                setIsAuthenticated(true);                
            
            }catch (error){
                console.error('Error fetching data:', error);
            }
        };
        checkUserData();
         
    },[])
  
  
  return (

    <Router>
      <div className="App bg-base-100">
       
        <Routes>
          {
            isAuthenticated ?
            <Route
            path='/'
            element={
              <>
                <div>
                  <Navbar />
                  <Dashboard setNutritionActive = {setNutritionActive} setActivityActive = {setActivityActive} setWorkoutActive = {setWorkoutActive} />
                  {nutritionActive && <NutritionalTracker setNutritionActive = {setNutritionActive}/>}
                  {workoutActive &&  <WorkoutPlanner />}
                  {activityActive && <CalorieCalculator />}
                </div>
              </>
            }
          />:
        <Route
            path='/'
            element={
              <>
                <Hero/>
              </>
            }
          />
          }
          
          <Route
            path='/login'
            element={
              <>
                <SignIn setIsAuthenticated={setIsAuthenticated} />
              </>
            }
          />
          <Route
            path='/signup'
            element={
              <>
                <SignUp/>
              </>
            }
          />

        </Routes>
        
      </div>
    </Router>


  );
}

export default App;