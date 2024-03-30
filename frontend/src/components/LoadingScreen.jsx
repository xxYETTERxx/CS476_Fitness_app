import React from 'react';
import logo from '../images/gg11.png'
import '../styles/LoadingScreen.css'; 

const LoadingScreen = () => (
    <div className='loading-screen flex flex-col items-center justify-center pt-5 pb-5'>
    <div className="logo w-64 h-52"> <img src={logo} alt="logo"/> </div>
    <div className="message">
        <span>The keys to a better health and your best self </span>
        <span>are right around the corner</span>
        </div>
    <div className="spinner"></div>
  </div>
);

export default LoadingScreen;