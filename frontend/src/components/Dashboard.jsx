import React, { useState, useEffect } from 'react';
import axios from 'axios';
import blankUser from '../images/blankUser.png'
//import scale from '../images/scale.png'
import CalorieTracker from '../functions/observer.js'

const calorieTracker = new CalorieTracker();


const user =null;

const Dashboard = ({setNutritionActive}) => {
    
    const [workoutActive, setWorkoutActive] = useState(false);
    const [activityActive, setActivityActive] = useState(false);

    const [username, setUsername] = useState('Bob Build');
    const [avatar, setAvatar] = useState(blankUser);
    const [userType, setUserType] = useState('basic');
    

    const CalorieIntakeComponent = () => {
        const [calorieIntake, setCalorieIntake] = useState(2000);

        useEffect(() => {
            const observer = {
                update: (intake, burn) => {
                    setCalorieIntake(intake);
                },
            };

            calorieTracker.subscribe(observer);
            return () => calorieTracker.unsubscribe(observer);
            },[]);
            
            return <div> {calorieIntake} </div>;
        };

        const CalorieBurnComponent = () => {
            const [calorieBurn, setCalorieBurn] = useState(1300);
    
            useEffect(() => {
                const observer = {
                    update: (intake, burn) => {
                        setCalorieBurn(burn);
                    },
                };
    
                calorieTracker.subscribe(observer);
                return () => calorieTracker.unsubscribe(observer);
                },[]);
                
                return <div> {calorieBurn} </div>;
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
        setNutritionActive(true);
    }

    return (
        <div className='flex justify-center pt-5 pb-5'>
            <div className="card card-side shadow-xl flex flex-col
                bg-base-300 pl-4 pr-4 justify-between max-w-xl">
                <div className='flex justify-between text-2xl font-medium b h-1/6
                    items-center'>
                    <h2>{username}</h2>
               
                </div>
                <div className='flex h-3/6  w-full'>
                    <div className='flex flex-col w-2/6 items-center justify-center '>
                        {
                            avatar ?
                            <img src={avatar} className='w-5/6 rounded-lg border border-neutral mb-3' />:
                            <img src={blankUser} className='w-5/6 rounded-lg border border-neutral mb-3' />
                        }
                        <div className='flex h-1/6 items-center'>
                            <text className='text-xl font-bold text-success pr-2'><span>-</span>2<span className='text-lg text-base-content'>lbs</span>
                            </text>
                            <button className="btn btn-square scaleButton">
                                <div className="indicator">
                                    <span className="indicator-item indicator-bottom badge badge-success scaleBadge">+</span>
                                    {/*<img src={scale} alt="scale" />*/}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className='flex flex-col w-4/6 pl-3 pr-3'>
                      
                        <button className="btn btn-outline btn-neutral w-full mb-4">Exercise</button>
                        <button onClick = {nActive} className="btn btn-outline btn-neutral w-full mb-4">Food</button>
                        {
                            userType === 'pro' &&(
                            <button className="btn btn-outline btn-neutral w-full">Workout Planner</button>
                        )}

                    </div>


                </div>
                <div className='flex flex-col  h-2/6 pt-8'>
                    <div className='flex justify-between pb-3'>
                        <div className='flex flex-col w-full pl-2'>
                            <div>
                                <text className='text-xl font-semibold'>2000</text>
                            </div>
                            <caption className='text-sm flex'>WATER INTAKE</caption>
                        </div>
                        <div className='divider'>|</div>
                        <div className='flex flex-col w-full pl-2'>
                            <div className='flex'>
                                <text className='w-2/3 text-xl font-semibold'><CalorieIntakeComponent /></text>
                                <text className='text-xl font-semibold'>-</text>
                            </div>
                            <caption className='text-sm flex'>CAL IN</caption>
                        </div>
                        <div className='flex flex-col w-full pl-2'>
                        <div className='flex'>
                        <text className='w-2/3 text-xl font-semibold'>1200</text>
                                <text className='text-xl font-semibold'>=</text>
                            </div>
                            <caption className='text-sm flex'>CAL BURN</caption>
                        </div>
                        <div className='flex flex-col w-full pl-2'>
                            <div>

                            </div>
                            <text className='text-xl font-semibold'>2300</text>
                        </div>
                    </div>
                </div>

            </div>
        </div>




           

    )
}

export default Dashboard