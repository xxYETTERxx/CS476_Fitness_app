import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blankUser from '../images/blankUser.png'
import calorieTracker from '../functions/observer.js'


const Dashboard = ({setNutritionActive, setActivityActive, setWorkoutActive}) => {
    
    const user = null;
    

    const [username, setUsername] = useState('Bob Build');
    const [avatar, setAvatar] = useState(blankUser);
    const [userType, setUserType] = useState('basic');

    const[dayFilter, setDayFilter] = useState('day');
    
    useEffect(() => {
            calorieTracker.fetchAndUpdateCalories(dayFilter);
    },[dayFilter,nActive,aActive,wActive]);

    const CalorieIntakeComponent = () => {
        const [calorieIntake, setCalorieIntake] = useState(0);

        useEffect(() => {
            const observer = {
                update: (totalCalories, water, burn, net) => {
                    console.log(calorieIntake);
                    let newCalories = totalCalories;
                    if (newCalories < 0) newCalories = 0; 
                    if (newCalories >= 100000) newCalories = "Value not valid";
                    setCalorieIntake(newCalories);
                },
            };
            
            calorieTracker.subscribe(observer);
            return () => calorieTracker.unsubscribe(observer);
            },[]);
            
            return <div> {calorieIntake} </div>;
        };

        const CalorieBurnComponent = () => {
            const [calorieBurn, setCalorieBurn] = useState(0);
    
            useEffect(() => {
                const observer = {
                    update: (intake, water, totalBurn, net) => {
                        let newBurn = totalBurn;
                        if (newBurn < 0) newBurn = 0; 
                        if (newBurn >= 100000) newBurn = "Value not valid";
                        setCalorieBurn(newBurn);
                    },
                };
    
                calorieTracker.subscribe(observer);
                return () => calorieTracker.unsubscribe(observer);
                },[]);
                
                return <div> {calorieBurn} </div>;
            };

        const WaterIntakeComponent = () => {
            const [waterIntake, setWaterIntake] = useState(0);
    
            useEffect(() => {
                const observer = {
                    update: (intake, totalWater, burn, net) => {
                        let newWater = totalWater;
                        if (newWater < 0) newWater = 0; 
                        if (newWater >= 100000) newWater = "Value not valid";
                        setWaterIntake(newWater);
                    },
                };
    
                calorieTracker.subscribe(observer);
                return () => calorieTracker.unsubscribe(observer);
                },[]);
                
                return <div> {waterIntake} </div>;
            };
        
        const NetCalorieComponent = () => {
            const [netCalorie, setNetCalorie] = useState(0);
            
    
            useEffect(() => {
                const observer = {
                    update: (intake, totalWater, burn, totalNet) => {
                        let newNet = totalNet;
                        if (newNet < 0) newNet = 0; 
                        if (newNet >= 100000) newNet = "Value not valid";
                        setNetCalorie(newNet);
                    },
                };
    
                calorieTracker.subscribe(observer);
                return () => calorieTracker.unsubscribe(observer);
                },[]);
                
                return <div> {netCalorie} </div>;
            };    
    
    useEffect(() =>{
        //retrieve user data
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
                
                const response = await axios.get('https://gymgenius-api.onrender.com/api/auth/userRetrieval', config);
                            
                setUsername(response.data.userName);
                setAvatar(response.data.avatar);
                setUserType(response.data.userType);
        
            }catch (error){
                console.error('Error fetching data:', error);
            }
        };
        fetchUserData(); 
    },[])

    function nActive(){
        setNutritionActive(prevNutritionActive => !prevNutritionActive);
        setActivityActive(false);
        setWorkoutActive(false);
    }
    function aActive(){
        setActivityActive(prevActivityActive => !prevActivityActive);
        setNutritionActive(false);
        setWorkoutActive(false);
    }
    function wActive(){
        setWorkoutActive(prevWorkoutActive => !prevWorkoutActive);
        setNutritionActive(false);
        setActivityActive(false);
    }

    return (
        <div className='flex flex-col items-center justify-center pt-5 pb-5'>
            <div className="card card-side shadow-xl flex flex-col bg-base-300 p-4 pt-0 max-w-xl " >
                <div className='flex justify-between text-2xl font-medium h-1/6 items-center'>
                    <h2 className='mt-5 ml-3'>{username}</h2>
               
                </div>
                <div className='flex h-4/6 w-full'>
                    <div className='flex flex-col w-2/6 items-center justify-around'>
                        {
                            avatar ?
                            <img src={avatar} className='w-64 h-46 rounded-lg border border-neutral' />:
                            <img src={blankUser} className='w-5/6 rounded-lg border border-neutral' />
                        }
                        
                    </div>
                    <div className='flex flex-col w-4/6 pl-3 pr-3'>
                      
                        <button onClick ={aActive} className="btn btn-outline btn-neutral w-full mb-4">Exercise</button>
                        <button onClick = {nActive} className="btn btn-outline btn-neutral w-full mb-4">Food</button>
                        {
                            userType === 'pro' &&(
                            <button onClick = {wActive} className="btn btn-outline btn-neutral w-full mb-4">Workout Planner</button>
                        )}

                    </div>


                </div>
                <div className='flex flex-col h-1/6 items-center w-full ml-5'>
                    <div className='flex mb-3 w-full' >
                        <div className='flex flex-col w-full '>
                            <div>
                                <text className='text-xl font-semibold'><WaterIntakeComponent /></text>
                            </div>
                            <caption className='text-sm flex'>WATER INTAKE</caption>
                        </div>
                        <div className='divider'>|</div>
                        <div className='flex flex-col w-full '>
                            <div className='flex'>
                                <text className='w-2/3 text-xl font-semibold'><CalorieIntakeComponent /></text>
                                <text className='text-xl font-semibold ml-3 mr-3'>-</text>
                            </div>
                            <caption className='text-sm flex'>CAL IN</caption>
                        </div>
                        <div className='flex flex-col w-full '>
                            <div className='flex'>
                                <text className='w-2/3 text-xl font-semibold'><CalorieBurnComponent /></text>
                                <text className='text-xl font-semibold ml-3 mr-3'>=</text>
                            </div>
                            <caption className='text-sm flex'>CAL BURN</caption>
                        </div>
                        <div className='flex flex-col w-full '>
                            <div>
                                <text className='text-xl font-semibold'><NetCalorieComponent /></text>
                                <caption className='text-sm flex'>TOTAL</caption>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className='flex justify-center mt-3 w-3/6'>
                <input type="radio" value='day' name='dateToggle' aria-label="Day" className="btn input-bordered bg-base-100  w-24" checked={dayFilter === 'day'} onChange={(e) => setDayFilter(e.target.value)}/>
                <input type="radio" value='week' name='dateToggle' aria-label="Week" className="btn input-bordered bg-base-100  w-24 ml-5 mr-5" checked={dayFilter === 'week'} onChange={(e) => setDayFilter(e.target.value)}/>
                <input type="radio" value='month' name='dateToggle' aria-label="Month" className="btn input-bordered bg-base-100  w-24" checked={dayFilter === 'month'} onChange={(e) => setDayFilter(e.target.value)}/>
            </div>
        </div>




           

    )
  }

export default Dashboard