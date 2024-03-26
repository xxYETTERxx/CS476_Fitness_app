import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CalorieCalculator from './components/CalorieCalculator';
import NutritionalTracker from './components/NutritionalTracker';
import WorkoutPlanner from './components/WorkoutPlanner';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";





function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [nutritionActive, setNutritionActive] = useState(false);
  const [workoutActive, setWorkoutActive] = useState(false);
  const [activityActive, setActivityActive] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from storage: ', token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [])
  return (

    <Router>
      <div className="App bg-base-100">
        
        <Navbar />

        <Routes>
          {
            isAuthenticated ?
            <Route
            path='/'
            element={
              <>
                <Dashboard setNutritionActive = {setNutritionActive} setActivityActive = {setActivityActive} setWorkoutActive = {setWorkoutActive} />
                {nutritionActive && <NutritionalTracker setNutritionActive = {setNutritionActive}/>}
                {workoutActive &&  <WorkoutPlanner />}
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