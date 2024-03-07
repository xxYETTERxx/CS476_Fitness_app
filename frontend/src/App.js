import React from 'react';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';

function App(){
  return (
    <div className="App bg-base-100">
      <Navbar/>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <Hero/> */}
      <Dashboard/>
      <SignUp />
    </div>
  );
}

export default App;