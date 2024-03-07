import React from 'react';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DailySummary from './components/DailySummary';

function App(){
  return (
    <div className="App bg-base-100">
      <Navbar/>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
      {/* <Hero/> */}
      <DailySummary/>
      <SignUp />
    </div>
  );
}

export default App;