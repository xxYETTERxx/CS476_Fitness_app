import React, { useState } from 'react';
import axios from 'axios';

function WorkoutPlanner() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [daySelected, setDaySelected] = useState('');
    const [workoutList, setWorkoutList] = useState([]);

    
    const workout = {
        title : title,
        description : description,
        day : daySelected
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

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
               
                const user = response.data.user;
                const day = daySelected;
                
            
            const userData = {
                user,
                day,
                title,
                description
            };

          
        
            const response1 = await axios.post('https://gymgenius-api.onrender.com/api/auth/workout',userData);
          

            if(response1.status===200 || response1.status ===201) {
                fetchWorkouts(daySelected);

                setTitle('');
                setDescription('');

            }

        } catch (error) {
            if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('Network Error')) {
                alert('Connection to server failed');
            }else if (error.response){
                console.error("Submission failed:", error.response.data);
                alert("Submission failed: " + error.response.data);
            }
            else{
                console.error("Submission failed:", error.message);
                alert("Submission failed: ", error.message);
            }
        }

    }

    const handleOptionSelect = (option) => {
        setDaySelected(option);
        fetchWorkouts(option);
      };

    const fetchWorkouts = async (selectedDay) => {
            setWorkoutList([]);
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.log("No token found");
                    return;
                }
                const config = {
                    headers: { Authorization: `Bearer ${token}` }
                }

                const userResponse = await axios.get(`https://gymgenius-api.onrender.com/api/auth/userRetrieval`, config);
                const user = userResponse.data.user;
                const day = selectedDay;
             
                const workoutResponse = await axios.get('https://gymgenius-api.onrender.com/api/auth/getWorkout', {
            params: {
                user,
                day
            }
        });
            setWorkoutList(workoutResponse.data);

            
            } catch (error) {
                console.error("Error fetching workouts:", error.message);  
            }
        }

        const removeWorkout = async (workoutId) => {
                try {
                  const token = localStorage.getItem('token');
                  if (!token) {
                    console.log("No token found");
                    return;
                  }
                  const config = {
                    headers: { Authorization: `Bearer ${token}` }
                  };
                  
                  await axios.delete(`https://gymgenius-api.onrender.com/api/auth/workoutRemove/${workoutId}`, config);
              
                  // Filter out the workout from the local state to update the UI
                  setWorkoutList(prevWorkouts => prevWorkouts.filter(workout => workout._id !== workoutId));
                  
                } catch (error) {
                  console.error("Error deleting workout:", error.message);
                  alert('Failed to delete workout');
                }
              }
        

 

    

    return (
        <div className='flex justify-center pt-1 pb-5'>
            <div className="card card-side shadow-xl flex flex-colbg-base-300 pl-4 pr-4 justify-between max-w-xl">
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="grid flex-grow h-35 card bg-base-300 rounded-box place-items-center">
                    <div className='flex justify-between text-5xl font-medium b h-1/6
                        items-center'>
                        <h2 className='mb-2'>Workout Planner</h2> 
                        </div>
                            <form id="trackerForm" onSubmit= {handleSubmit}>
                                <label className="input input-bordered flex items-center gap-2" value="Workout Title">Workout Title:
                                <input type="text" id="workoutTitle" name="workoutTitle" value={title} onChange={(e)=>setTitle(e.target.value)} />
                                </label>
                                <br></br>
                            
                                <textarea type="text" id="description" name="description" className="textarea textarea-bordered textarea-lg w-full max-w-xs" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Type here..." />
                               

                                <div>

                                <label htmlFor="dayOfTheWeek">Day of Week:</label>
                                            <select className="select select-primary w-full max-w-xs mb-2" value={daySelected} onChange={(e) => handleOptionSelect(e.target.value)}>
                                                <option value="">Select...</option>
                                                <option value="Sunday">Sunday</option>
                                                <option value="Monday">Monday</option>
                                                <option value="Tuesday">Tuesday</option>
                                                <option value="Wednesday">Wednesday</option>
                                                <option value="Thursday">Thursday</option>
                                                <option value="Friday">Friday</option>
                                                <option value="Saturday">Saturday</option>
                                            </select>
                            
                                        
                                <button className="btn btn-neutral" type="submit">Submit</button>  
                                
                            </div>

                            </form>
                            <div className='mt-8'>
                            <div className='bg-gray-200 p-4 rounded-md shadow-lg'> {/* Box styling */}
                                <h3 className='font-bold text-lg mb-4 text-center'>{daySelected} Workouts</h3>
                                <ul>
                                {workoutList.map((workout, index) => (
                                    <li key={index} className='bg-white p-2 rounded-md mb-2 shadow border flex justify-between items-center'>
                                    <div>
                                        <p className='font-bold'>{workout.title}</p>
                                        <p>{workout.description}</p>
                                    </div>
                                    <button className='ml-4 btn btn-error btn-sm' onClick={() => removeWorkout(workout._id)}>Remove</button> {/* Remove button */}
                                    </li>
                                ))}
                                </ul>
                            </div>
                            </div>
                    
                    </div> 
                   
                </div>

                </div>
           
        </div>

        
    )

}
export default WorkoutPlanner;
