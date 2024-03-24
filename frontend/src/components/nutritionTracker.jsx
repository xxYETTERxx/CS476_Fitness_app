import React, { useState } from 'react';
import axios from 'axios';

function NutritionalTracker(){
    const [selectedOption, setSelectedOption] = useState(null);

    const [calorieIntake, setCalories] = useState('');

    const [waterIntake, setWaterIntake] = useState('');


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
                const user = response.data.user._id;
                console.log("calorieIntake:", calorieIntake);
                console.log("waterIntake:", waterIntake);
            
            const userData = {
                user,
                calorieIntake,
                waterIntake
            };
            console.log("sending request");
            const response1 = await axios.post('http://localhost:5000/api/auth/nutrition',userData);
            console.log("Response recieved: ", response1.status);

            if(response1.status===200 || response1.status ===201) {

                alert('Submission Succesful!');

                setCalories('');
                setWaterIntake('');
                setFoodType('');

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
      setSelectedOption(option);
    };

    return (
        <div className='flex justify-center pt-20 pb-5'>
            <div className="card card-side shadow-xl flex flex-colbg-base-300 pl-4 pr-4 justify-between max-w-xl">
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="grid flex-grow h-35 card bg-base-300 rounded-box place-items-center">
                    <div className='flex justify-between text-2xl font-medium b h-1/6
                        items-center'>
                        <h2>Food and Water Consumption</h2> 
                        </div>
                            <form id="trackerForm" onSubmit= {handleSubmit}>
                                <label className="input input-bordered flex items-center gap-2" for="waterIntake (in ml)">Water Intake (ml):

                                <input type="number" id="waterIntake" name="waterIntake" value={waterIntake} onChange={(e)=>setWaterIntake(e.target.value)} />
                                </label>
                                <br></br>
                                <label className="input input-bordered flex items-center gap-2" for="caloriesConsumed">Calories Consumed:
                                <input type="number" id="calories" name="calories" value={calorieIntake} onChange={(e)=>setCalories(e.target.value)} />

                                </label>

                                <div>
                                        <label for="typeConsumed">Food Type:</label>
                                            <select className="select select-primary w-full max-w-xs" value={selectedOption} onChange={(e) => handleOptionSelect(e.target.value)}>
                                                <option value="">Select...</option>
                                                <optgroup lable = "Meat">
                                                    <option value="Chicken">Chicken</option>
                                                    <option value="Beef">Beef</option>
                                                    <option value="Pork">Pork</option>
                                                    <option value="Tuna">Tuna</option>
                                                </optgroup>
                                                <optgroup lable = "Vegtables">
                                                    <option value="Broccoli">Broccoli</option>
                                                    <option value="Cabbage">Cabbage</option>
                                                    <option value="Carrots">Carrots</option>
                                                    <option value="Green Beans">Green Beans</option>
                                                    <option value="Onions">Onions</option>
                                                    <option value="Spinach">Spinach</option>
                                                </optgroup>
                                                <optgroup lable = "Fruit">
                                                    <option value="Apple">Apple</option>
                                                    <option value="Orange">Orange</option>
                                                    <option value="Banana">Banana</option>
                                                    <option value="Pineapple">Pineapple</option>
                                                    <option value="Kiwi">Kiwi</option>
                                                    <option value="Grapefruit">Grapefruit</option>
                                                </optgroup>
                                     
                                                                                         
                                            </select>
                                
                                            {selectedOption && (
                                                <p>You selected: {selectedOption}</p>
                                            )}
                                
                                <button className="btn btn-neutral" type="submit">Submit</button>  
                                
                            </div>
                        
                            </form>

                    
                    </div> 
                   
                </div>

                </div>
           
        </div>

        
    )

}
export default NutritionalTracker