import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blankUser from '../images/blankUser.png'
//import scale from '../images/scale.png'
import calorieTracker from '../functions/observer.js'


const Dashboard = ({setNutritionActive}) => {
    
    calorieTracker.fetchAndUpdateCalories();
    const user = null;
    const [workoutActive, setWorkoutActive] = useState(false);
    const [activityActive, setActivityActive] = useState(false);

    const [username, setUsername] = useState('Bob Build');
    const [avatar, setAvatar] = useState(blankUser);
    const [userType, setUserType] = useState('basic');
    

    const CalorieIntakeComponent = () => {
        const [calorieIntake, setCalorieIntake] = useState(0);

        useEffect(() => {
            const observer = {
                update: (totalCalories, water, burn, net) => {
                    setCalorieIntake(totalCalories);
                },
            };
            
            calorieTracker.subscribe(observer);
            return () => calorieTracker.unsubscribe(observer);
            },[]);
            
            return <div> {calorieIntake} </div>;
        };

        const CalorieBurnComponent = () => {
            const [totalBurn, setTotalBurn] = useState(0);
    
            useEffect(() => {
                const observer = {
                    update: (intake, water, totalBurn, net) => {
                        setTotalBurn(totalBurn);
                    },
                };
    
                calorieTracker.subscribe(observer);
                return () => calorieTracker.unsubscribe(observer);
                },[]);
                
                return <div> {totalBurn} </div>;
            };

        const WaterIntakeComponent = () => {
            const [waterIntake, setWaterIntake] = useState(0);
    
            useEffect(() => {
                const observer = {
                    update: (intake, totalWater, burn, net) => {
                        setWaterIntake(totalWater);
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
                        setNetCalorie(totalNet);
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
                

                const response = await axios.get('http://localhost:5000/api/auth/userRetrieval', config);
                
            
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
    }

    return (
        <div className='flex flex-col items-center justify-center h-screen p-5'>
            <div className="card card-side shadow-xl flex flex-col bg-base-300 p-4 pt-0 max-w-xl " >
                <div className='flex justify-between text-2xl font-medium h-1/6 items-center'>
                    <h2 className='mt-1'>{username}</h2>
               
                </div>
                <div className='flex h-4/6 w-full'>
                    <div className='flex flex-col w-2/6 items-center justify-around'>
                        {
                            avatar ?
                            <img src={avatar} className='w-5/6 rounded-lg border border-neutral' />:
                            <img src={blankUser} className='w-5/6 rounded-lg border border-neutral' />
                        }
                        <div className='flex items-center'>
                            <text className='text-xl font-bold text-success mr-2'><span>-</span>2<span className='text-lg text-base-content'>lbs</span>
                            </text>
                            <button className="btn btn-square scaleButton">
                                <div className="indicator">
                                    <span className="indicator-item indicator-bottom badge badge-success scaleBadge">+</span>
                                    {/*<img src={scale} alt="scale" />*/}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col w-4/6 p-3 justify-center'>

                        <button className="btn btn-outline btn-neutral w-full">Exercise</button>
                        <button onClick={nActive} className="btn btn-outline btn-neutral w-full mb-3 mt-3">Food</button>
                        
                        {
                            userType === 'pro' && (
                                <button className="btn btn-outline btn-neutral w-full">Workout Planner</button>
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
                                <text className='text-xl font-semibold'>-</text>
                            </div>
                            <caption className='text-sm flex'>CAL IN</caption>
                        </div>
                        <div className='flex flex-col w-full '>
                            <div className='flex'>
                                <text className='w-2/3 text-xl font-semibold'><CalorieBurnComponent /></text>
                                <text className='text-xl font-semibold'>=</text>
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
                <input type="radio" value='day' name='dateToggle' aria-label="Day" className="btn input-bordered bg-base-100  w-24" checked/>
                <input type="radio" value='month' name='dateToggle' aria-label="Month" className="btn input-bordered bg-base-100  w-24 ml-5 mr-5" />
                <input type="radio" value='year' name='dateToggle' aria-label="Year" className="btn input-bordered bg-base-100  w-24" />
            </div>
        </div>




           

    )
  }

export default Dashboard