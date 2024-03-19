import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blankUser from '../images/blankUser.png'

const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [calorieIntake, setCalorieIntake] =useState(0);

    useEffect(() =>{
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token){
                    console.log("No token found");
                    return;
                }
                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                };
                
                const response = await axios.get('http://localhost:5000/api/auth/dashboard', config);

                setUsername(response.data.userName);
                
                
            }catch (error){
                console.error('Error fetching data:', error);
            }
        };
        fetchUserData(); 
    },[])

    return (

        <div className='flex justify-center items-center h-screen'>
        <div className="card card-side shadow-xl flex flex-col bg-base-300 p-6 w-5/6 max-w-2xl">
            <div className='flex  md:text-2xl md:font-medium h-1/6 items-center'>
                <h2>Your Daily Summary :</h2>
                <h2 className='font-bold ml-5 md:text-3xl'>{username}John Brown</h2>
               
            </div>
            <div className='flex mt-5'>
                <img src={blankUser} className='w-2/6  rounded-lg border border-neutral ' />
                <div className='flex flex-col w-full justify-between ml-5'>
                    <div>
                    <h1 className='text-sm mb-1'>Calories Remaining:</h1>
                    <text className='text-5xl font-bold text-primary 0'>300</text>
                    </div>
          
                    <button className="btn btn-outline btn-neutral w-full ">Add Exercise</button>
                    <button className="btn btn-outline btn-neutral w-full">Add Food</button>
                </div>
                </div>
                <div className='flex justify-center bg-base-200 mt-5 rounded'>
                    <div className='flex flex-col m-3'>
                        <text className='text-2xl font-semibold'>2300</text>
                        <caption className='text-sm flex'>FOOD</caption>
                    </div>
                    <text className='text-2xl font-semibold m-3'>-</text>
                    <div className='flex flex-col m-3'>
                        <text className='text-2xl font-semibold'>2300</text>
                        <caption className='text-sm flex'>EXERCISE</caption>
                    </div>
                    <text className='text-2xl font-semibold m-3'>=</text>
                    <div className='flex flex-col m-3'>
                        <text className='text-2xl font-semibold'>2300</text>
                        <caption className='text-sm flex'>NET</caption>
                    </div>
                </div>
            </div>
        </div>




           

    )
}

export default Dashboard