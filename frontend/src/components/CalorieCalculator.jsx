import React, { useState } from 'react';
import '../styles/CalorieCalculator.css'; 
import axios from 'axios';
import calorieTracker from '../functions/observer';

const CalorieCalculator = () => {
  // State variables
  const [weight, setWeight] = useState('');
  const [weightUnit, setWeightUnit] = useState('kg');
  const [duration, setDuration] = useState('');
  const [exercise, setExercise] = useState('');
  const [exerciseList, setExerciseList] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  

  // Function to add an exercise to the list
  const addExercise = () => {
    if (
      exercise &&
      duration &&
      !isNaN(duration) &&
      parseFloat(duration) > 0 &&     // Duration must be greater than 0
      !isNaN(weight) &&
      parseFloat(weight) > 0          // Weight must be greater than 0
    ) {
      const exerciseItem = {
        exercise: exercise.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()), // Replace underscores with spaces (added to stop exercise list problems)
        duration: parseFloat(duration)                                                        // Capitalize first letter of each word (added to stop exercise list problems)
      };
      setExerciseList([...exerciseList, exerciseItem]);
      setExercise('');
      setDuration('');
      setShowWarning(false);          // Reset warning state
    } else {
      setShowWarning(true);           // Show warning if input is invalid
    }
  };

  // Function to remove an exercise from the list
  const removeExercise = (index) => {
    const newExerciseList = [...exerciseList];
    newExerciseList.splice(index, 1);
    setExerciseList(newExerciseList);
  };

  // Function to calculate the total calories burned
  const calculateTotalCalories = () => {
    let totalCalories = 0;
    exerciseList.forEach((item) => {
      const met = getMETValue(item.exercise);
      const calories = (met * parseFloat(convertWeightToKg(weight, weightUnit)) * item.duration) / 60;
      totalCalories += calories;
    });
    setTotalCaloriesBurned(totalCalories.toFixed(2));
    handleSubmit(totalCalories);
  };

  const handleSubmit = async (calories) => {
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
          const caloriesBurned = Math.floor(calories);
      
        const userData = {
            user,
            caloriesBurned
        };
        console.log("sending request");
        const response1 = await axios.post('http://localhost:5000/api/auth/activity',userData);
        console.log("Response recieved: ", response1.status);

        if(response1.status===200 || response1.status ===201) {

            alert('Submission Succesful!');
            calorieTracker.fetchAndUpdateCalories();
            setExerciseList([]);

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

  // Function to retrieve MET value for a given exercise
  const getMETValue = (exercise) => {

    const metValues = {
      'walking': 3.5,
      'running': 7,
      'swimming': 8,
      'cycling': 6,
      'weight lifting': 3,
      'sleeping': 0.9,
      'sitting idle': 1,
      'desk work': 1.8,
      'slow walking': 2.3,
      'light calisthenics': 3.5,
      'moderate calisthenics': 3.8,
      'heavy calisthenics': 4,
      'pilates': 3.8,
      'resistance training': 3,
      'light stationary biking': 5.3,
      'moderate stationary biking': 5.5,
      'heavy stationary biking': 6,
      'power walking': 3.6,
      'bicycling leisurely': 4,
      'heavy bicycling': 6,
      'jogging': 7,
      'sprinting': 9,
      'light rope jumping': 6.5,
      'moderate rope jumping': 8,
      'heavy rope jumping': 10,
    };
  
    const metValue = metValues[exercise.toLowerCase()] || 1; // Default to 1 if MET value is not found
    return metValue;
  };

  // Function to convert weight to kilograms
  const convertWeightToKg = (weight, unit) => {
    if (unit === 'lbs') {
      return parseFloat(weight) * 0.453592;       // Convert pounds to kilograms
    }
    return parseFloat(weight);
  };

  // Function for weight unit change
  const handleWeightUnitChange = (e) => {
    const selectedUnit = e.target.value;
    setWeightUnit(selectedUnit);
    // Convert weight to the selected unit
    if (selectedUnit === 'lbs' && weightUnit === 'kg') {
      setWeight(parseFloat(weight) * 2.20462);                  // Convert kilograms to pounds
    } else if (selectedUnit === 'kg' && weightUnit === 'lbs') {
      setWeight(parseFloat(weight) * 0.453592);                 // Convert pounds to kilograms
    }
  };
  
    return (
        <div className="calorie-calculator-container">
          <h2 className="calorie-calculator-header">Calorie Calculator</h2>
          <form className="calorie-calculator-form" onSubmit={(e) => { e.preventDefault(); addExercise(); }}>
            <div className="input-group">
              <label>
              Current Weight:
              <input
              type="number"
              value={weight}
              step="1"                                                  // prevent decimal places being entered
              onChange={(e) => {
                const inputValue = parseInt(e.target.value);
                setWeight(Math.min(Math.max(1, inputValue), 500));      // Set min/max values that can be entered
              }}/>
              </label>
              <label>
                Measurement Type:
                <select value={weightUnit} onChange={handleWeightUnitChange}>
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </label>
            </div>
            <label>
              Exercise Type:
              <select value={exercise} onChange={(e) => setExercise(e.target.value)}>
                <option value="">Select an exercise</option>
                <optgroup label="Light">
                  <option value="sleeping">Sleeping</option>
                  <option value="sitting idle">Sitting Idle</option>
                  <option value="desk work">Desk Work</option>
                  <option value="slow walking">Slow Walking</option>
                  <option value="light bicycling">Leisurely Bicycling</option>
                  <option value="light calisthenics">Calisthenics</option>
                  <option value="light stationary biking">Stationary Biking</option>
                  <option value="light rope jumping">Rope Jumping</option>
                </optgroup>
                <optgroup label="Moderate">
                  <option value="walking">Walking</option>
                  <option value="resistance training">Resistance Training</option>
                  <option value="moderate calisthenics">Calisthenics</option>
                  <option value="pilates">Pilates</option>
                  <option value="moderate stationary biking">Stationary Biking</option>
                  <option value="moderate rope jumping">Rope Jumping</option>
                </optgroup>
                <optgroup label="Vigorous">
                  <option value="power walking">Power Walking</option>
                  <option value="bicycling leisurely">Leisurely Bicycling</option>
                  <option value="heavy bicycling">Bicycling</option>
                  <option value="jogging">Jogging</option>
                  <option value="sprinting">Sprinting</option>
                  <option value="swimming">Swimming</option>
                  <option value="running">Running</option>
                  <option value="heavy stationary biking">Stationary Biking</option>
                  <option value="heavy rope jumping">Rope Jumping</option>
                </optgroup>
              </select>
            </label>
            <label>
            Duration (minutes):
            <input 
              type="number" 
              value={duration} 
              step="1"                                                                              // Prevent decimals
              onChange={(e) => setDuration(Math.min(Math.max(1, parseInt(e.target.value)), 360))}   // set min/max values that can be entered
            />
            </label>
            {showWarning && <p className="warning-message">Please enter valid values for weight and duration.</p>}
            <button type="submit">Add Exercise</button>
          </form>
          <div className="exercise-list">
            <h3>Exercise List</h3>
            <ul>
              {exerciseList.map((item, index) => (
                <li key={index} className="exercise-item">
                  {item.exercise} - {item.duration} minutes
                  <button onClick={() => removeExercise(index)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>
          {exerciseList.length > 0 && (
            <div className="total-calories">
              <button className="calculate-button" onClick={calculateTotalCalories}>Calculate Total Calories</button>
              <p>Total Calories Burned: {totalCaloriesBurned}</p>
            </div>
          )}
        </div>
      );
    };
    
    export default CalorieCalculator;