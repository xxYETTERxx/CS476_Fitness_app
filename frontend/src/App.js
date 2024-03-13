import React, { useState, useEffect } from 'react';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';



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
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <Hero/> */}
      {isAuthenticated && <Dashboard/>};
      <div style = {{marginLeft: 20}}>
        <SignUp />
        <br/>
        <SignIn setIsAuthenticated={setIsAuthenticated}/>
      </div>
    </div>
  );
}

export default App;