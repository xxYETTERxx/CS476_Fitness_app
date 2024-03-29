import React, { useState, useEffect } from 'react';
import logo from '../images/gg11.png'

const onLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}


const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState('');

    useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, [])
    return (

        <div className="navbar static flex justify-between">
            <a href='/' className="btn glass text-xl"><img className='h-8' src={logo} alt="logo" /></a>              
              <div className="navbar-end">
                {isAuthenticated && <button onClick= {onLogout} className="btn">Logout</button>}
                
            </div>
        </div>
    )
}

export default Navbar