import React from 'react'
import heroText from '../images/heroTextLight.png'

const Hero = () => {
    return (
        <div className="hero min-h-screen mainHero">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold">Welcome to</h1>
                    <img className="" src={heroText} />

                    <p className="m-5">Where every step you take and every bite you track brings you closer to your healthiest self.</p>
                    <div className='flex justify-center'>
                        <a href="/login" className="btn btn-lg m-3 btn-primary">Login</a>
                        <a href="/signup" className="btn btn-lg m-3 btn-primary">Signup</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;