import React, { useState } from 'react';
import axios from 'axios';
import calorieTracker from '../functions/observer';
import '../styles/NutritionTracker.css';

function NutritionalTracker({ setNutritionActive }) {
    
    const [selectedOption, setSelectedOption] = useState(null);
    const [calorieIntake, setCalories] = useState('');
    const [waterIntake, setWaterIntake] = useState('');
    const [foodItem, setFoodItem] = useState('');
    const [foodList, setFoodList] = useState([]);

    const addFoodtoList = () => {
        if (foodItem) {
            setFoodList([...foodList, foodItem]);
            calculateCalories();
        }
        else {
            console.error("No Food Selected");
        }
    }

    const calculateCalories = () => {
        let totalCalories = 0;

        foodList.forEach((item) => {
            totalCalories += getCALValues(item);
        });
        return totalCalories;
    }

    const removeAll = () => {
        setFoodList([]);
    }

    const getCALValues = (foodItem) => {
        const calorieValues = {
            Chicken: 239,
            Beef: 250,
            Pork: 211,
            Tuna: 203,
            Broccoli: 34,
            Cabbage: 25,
            Carrots: 41,
            GreenBeans: 31,
            Onions: 40,
            Spinach: 23,
            Apple: 52,
            Orange: 47,
            Banana: 45,
            Pineapple: 50,
            Kiwi: 61,
            Grapefruit: 97
        };
        return calorieValues[foodItem] || 0; // Default to 1 if MET value is not found
    };

    // Function to remove an exercise from the list
    const removeFood = (index) => {
        const newFoodList = [...foodList];
        newFoodList.splice(index, 1);
        setFoodList(newFoodList);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log("submitting");
            const token = localStorage.getItem('token');
            if (!token) {
                console.log("No token found");
                return;
            }
            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const response = await axios.get('http://localhost:5000/api/auth/userRetrieval', config);
            console.log(response.data.user);
            const user = response.data.user;

            const waterIntakeValue = waterIntake ? parseInt(waterIntake, 10) : 0;
            const calorieIntakeValue = calorieIntake ? parseInt(calorieIntake, 10) : 0;

            const totalCalories = foodList.length > 0 ? calculateCalories() : 0;
            const date = Date.now();

            const userData = {
                user,
                calorieIntake: totalCalories || calorieIntakeValue,
                waterIntake: waterIntakeValue,
                date
            };
            console.log("sending request");
            const response1 = await axios.post('http://localhost:5000/api/auth/nutrition', userData);

            if (response1.status === 200 || response1.status === 201) {

                calorieTracker.fetchAndUpdateCalories();
                alert('Submission Succesful!');

                setCalories('');
                setWaterIntake('');
                setFoodItem('');
                removeAll();
            }

        } catch (error) {
            if (error.message.includes('ERR_CONNECTION_REFUSED') || error.message.includes('Network Error')) {
                alert('Connection to server failed');
            } else if (error.response) {

                console.error("Submission failed:", error.response.data);
                alert("Submission failed: " + error.response.data);
            }
            else {
                console.error("Submission failed:", error.message);
                alert("Submission failed: ", error.message);
            }
        }

    }

    return (
        <div className='flex justify-center pt-5 pb-10'>
            <div className="card card-side shadow-xl flex flex-colbg-base-300 pl-4 pr-4 justify-between max-w-xl">
                <div className="flex flex-col w-full lg:flex-row">
                    <div className="grid flex-grow card bg-base-300 rounded-box place-items-center">
                        <div className='flex justify-between text-2xl font-medium b h-1/2 items-center'>
                            <h2 className="mb-3.5">Food and Water Consumption</h2>
                        </div>

                        <form id="trackerForm" onSubmit={handleSubmit}>
                            <label className="input input-bordered flex items-center gap-2" for="waterIntake (in ml)">Water Intake (ml):
                                <input type="number" id="waterIntake" name="waterIntake" value={waterIntake} onChange={(e) => setWaterIntake(e.target.value)} />
                            </label>

                            <br></br>

                            <label className="input input-bordered flex items-center gap-2 mb-4" for="caloriesConsumed">Calories Consumed:
                                <input type="number" id="calories" name="calories" value={calorieIntake} onChange={(e) => setCalories(e.target.value)} />
                            </label>

                            <div>
                                <label className="typeConsumed mr-2">Food Type:</label>
                                <select className="select select-primary w-full max-w-xs mb-4" value={foodItem} onChange={(e) => setFoodItem(e.target.value)}>
                                    <option value="">Select...</option>
                                    <optgroup label="Meat">
                                        <option value="Chicken">Chicken</option>
                                        <option value="Beef">Beef</option>
                                        <option value="Pork">Pork</option>
                                        <option value="Tuna">Tuna</option>
                                    </optgroup>
                                    <optgroup label="Vegtables">
                                        <option value="Broccoli">Broccoli</option>
                                        <option value="Cabbage">Cabbage</option>
                                        <option value="Carrots">Carrots</option>
                                        <option value="GreenBeans">Green Beans</option>
                                        <option value="Onions">Onions</option>
                                        <option value="Spinach">Spinach</option>
                                    </optgroup>
                                    <optgroup label="Fruit">
                                        <option value="Apple">Apple</option>
                                        <option value="Orange">Orange</option>
                                        <option value="Banana">Banana</option>
                                        <option value="Pineapple">Pineapple</option>
                                        <option value="Kiwi">Kiwi</option>
                                        <option value="Grapefruit">Grapefruit</option>
                                    </optgroup>
                                </select>
                            </div>

                            <button onClick={addFoodtoList} className="btn btn-neutral mt-1" type="button">Add Food</button>

                            <div className="food-list mb-2">
                                <ul>
                                    {foodList.map((item, index) => (
                                        <li key={index} className="flex-containter food-item">
                                            <span className="food-name-and-calories">{item} - {getCALValues(item)}</span>
                                            <button onClick={() => removeFood(index)} className="btn btn-neutral ml-20 mt-1 " type='button'>Remove</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="btn btn-neutral mr-100 mt-1" type="submit">Submit</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default NutritionalTracker;