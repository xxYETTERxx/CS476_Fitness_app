import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";



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


    // <Routes>
    //   <Route
    //     path="/"
    //     element={
    //       <>
    //         <Hero />
    //   />
    // </Routes>

    <Router>
      <div className="App bg-base-100">
        
        <Navbar />

        <Routes>
          <Route
            path='/'
            element={
              <>
                <Hero/>
              </>
            }
          />
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
                <a href='/dashboard'>temp dashboard link</a>
              </>
            }
          />
          <Route
            path='/dashboard'
            element={
              <>
                <Dashboard/>
              </>
            }
          />
        </Routes>

        {/* <Hero/> */}
        {isAuthenticated && <Dashboard />}
      </div>
    </Router>


  );
}

export default App;