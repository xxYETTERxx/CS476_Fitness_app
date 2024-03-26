import React, { useState } from 'react';
import axios from 'axios';

function WorkoutPlanner() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [daySelected, setDaySelected] = useState('');
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("submitting");
            const token = localStorage.getItem('token');
                if (!token){
                    console.log("No token found");
                    return;
                }
                const config = {
                    headers: { Authorization: `Bearer ${token}`}
                };
                
                const response = await axios.get('http://localhost:5000/api/auth/userRetrieval', config);
                console.log(response);
                const user = response.data.user;
                const day = daySelected;
                
            
            const userData = {
                user,
                day,
                title,
                description
            };

            console.log(userData);
            console.log("sending request");
            const response1 = await axios.post('http://localhost:5000/api/auth/workout',userData);
            console.log("Response recieved: ", response1.status);

            if(response1.status===200 || response1.status ===201) {
                alert('Submission Succesful!');

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
      };
      
    const fetchWorkout = () => 
    }

    

    return (
        <div className='flex justify-center pt-20 pb-5'>
            <div className="card card-side shadow-xl flex flex-colbg-base-300 pl-4 pr-4 justify-between max-w-xl">
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="grid flex-grow h-35 card bg-base-300 rounded-box place-items-center">
                    <div className='flex justify-between text-5xl font-medium b h-1/6
                        items-center'>
                        <h2>Workout Planner</h2> 
                        </div>
                            <form id="trackerForm" onSubmit= {handleSubmit}>
                                <label className="input input-bordered flex items-center gap-2" for="Workout Title">Workout Title:
                                <input type="text" id="workoutTitle" name="workoutTitle" value={title} onChange={(e)=>setTitle(e.target.value)} />
                                </label>
                                <br></br>
                            
                                <textarea type="text" id="description" name="description" className="textarea textarea-bordered textarea-lg w-full max-w-xs" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder="Type here..." />
                               

                                <div>

                                <label for="dayOfTheWeek">Day of Week:</label>
                                            <select className="select select-primary w-full max-w-xs" value={daySelected} onChange={(e) => handleOptionSelect(e.target.value)}>
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

                    
                    </div> 
                   
                </div>

                </div>
           
        </div>

        
    )

}
export default WorkoutPlanner