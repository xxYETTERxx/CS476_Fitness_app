import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import NutritionalTracker from './components/nutritionTracker';
import CalorieCalculator from './components/CalorieCalculator';


function App(){
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect (() => {
    const token = localStorage.getItem('token');
    console.log('Token from storage: ', token);
    if (token){
      setIsAuthenticated(true);
    }
  }, [])
  return (
    <div className="App bg-base-100">
      <Navbar/>
      {/* <Hero/> */}
      <CalorieCalculator/>
      {isAuthenticated && <Dashboard/>};
      <NutritionalTracker/>
      <div style = {{marginLeft: 20}}>

        <SignUp />
        <br/>
        <SignIn setIsAuthenticated={setIsAuthenticated}/>
      </div>
    </div>
  );
}

export default App;