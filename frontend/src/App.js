import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NutritionalTracker from './components/NutritionalTracker';
//add your import here



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from storage: ', token);
    if (token) {
      setIsAuthenticated(true);
    }
  }, [])
  return (



    <Router>
      <div className="App bg-base-200">
        <Navbar />

        <Routes>
          <Route
            path='/tester'
            element={
              <>
                <Hero/>
              </>
            }
          
          />
        </Routes>

        {/* add your component in here*/}
        {<Dashboard />}
        {/* <NutritionalTracker />   */}  
        <div>
       {/*    <SignUp /> */}
          <br />
          <SignIn setIsAuthenticated={setIsAuthenticated} />
        </div>

      </div>
    </Router>


  );
}

export default App;