//Add error exception handling and input validation
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createModel = require('../factories/modelFactory');
const User = require('../models/User');
const Workout = require('../models/Workout');
const Nutrition = require('../models/Nutrition');
const Activity = require('../models/Activity');
const { isAlphaLocales } = require('validator');
const router = express.Router();


// Registration endpoint
router.post('/register', async (req, res) => {
    try {
          
       const user = createModel('user', req.body);
    
       //Save the user to database
       const newUser = await user.save();
       
       //Respond with created user
       res.status(201).json({ user: newUser.id, email: newUser.email, userType: newUser.userType });
    }  catch (error) {
       res.status(400).json({ error: error.message});
    }
});

const secretKey = process.env.JWT_SECRET_KEY; 

//Sign-In end point
router.post('/login', async (req, res) => {
    

    try {
      const { email, password } = req.body;
      console.log("running");

      const user = await User.findOne({ email: email});
      if (!user) {
         return res.status(404).send('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch){
         return res.status(401).send('Invalid Password');
      }

      const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '2h' });
      
      //return token
      res.json({ token });

    }  catch (error) {
       res.status(400).json({ error: error.message});
    }
});


//User retrieval endpoint
router.get('/userRetrieval', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey); 

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({
      user: user._id,
      userName: user.userName,
      avatar: user.avatar,
      userType: user.userType
    });
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Session has expired, please log in again' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

//User retrieval endpoint
router.get('/userRetrieval', async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secretKey); 
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Send back user data
    res.json({
      user: user
    });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Session has expired, please log in again' });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});


//Nutrition EndPoint
router.post('/nutrition', async (req, res) => {
    
   try {
      
      const newEntry = createModel('nutrition', req.body)
    
      const savedEntry = await newEntry.save();

      res.status(201).json({savedEntry});
      
      } catch(error){
        res.status(400).json ({ error: error.message});
      }

});

//Activity EndPoint
router.post('/activity', async (req, res) => {
  console.log("activity submission");
    
  try {
      
   const newEntry = createModel('activity', req.body)
 
   const savedEntry = await newEntry.save();

   res.status(201).json({savedEntry});
   
   } catch(error){
     res.status(400).json ({ error: error.message});
   }
});

//NutritionRetrieve Endpoint
router.get('/nutritionIntake', async (req, res) =>{
  try{
    const {user, startDate, endDate} = req.query;

    console.log("user", user);
    console.log("StartDate:",startDate);
    console.log("enddate:",endDate);

    const entries = await Nutrition.find({
      user: user,
      date: {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
      }
    });

    res.json(entries);

    } catch (error){
      console.error("Error fetching Nutrition Data",error);
      res.status(500).send('Server Error');
    }
  });

//WorkoutPlanner EndPoint
router.post('/workout', async (req, res) => {
    
  try {
      
      const newEntry = createModel('workout', req.body)
    
      const savedEntry = await newEntry.save();

      res.status(201).json({savedEntry});
      
      } catch(error){
        res.status(400).json ({ error: error.message});
      }


});

//WorkoutRetrieval EndPoint
router.get('/getWorkout', async (req, res) => {

   try{
    const {user, day} = req.query;

    console.log("user", user);

    const entries = await Workout.find({
      user: user,
      day: day
    });
   
    res.json(entries);

    } catch (error){
      console.error("Error fetching Workout Data",error);
      res.status(500).send('Server Error');
    }
  });

//WorkoutRemove endpoint

router.delete('/workoutRemove/:id', async (req, res) => {
  try {
    const workoutId = req.params.id;
    // Use the ID to delete the workout from the database
    await Workout.findByIdAndDelete(workoutId);
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting workout' });
  }
});

//NutritionRetrieve Endpoint

router.get('/nutritionIntake', async (req, res) =>{
  try{
    const {user, startDate, endDate} = req.query;

    const entries = await Nutrition.find({
      user: user,
      date: {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
      }
    });


    res.json(entries);

    } catch (error){
      console.error("Error fetching Nutrition Data",error);
      res.status(500).send('Server Error');
    }
  });

//Calorie Burn endpoint

router.get('/calorieBurn', async (req, res) =>{
  try{
    const {user, startDate, endDate} = req.query;

    const entries = await Activity.find({
      user: user,
      date: {
        $gte: new Date(startDate),
        $lt: new Date(new Date(endDate).setUTCHours(23, 59, 59, 999))
      }
    });

    res.json(entries);

    } catch (error){
      console.error("Error fetching Activity Data",error);
      res.status(500).send('Server Error');
    }
  }); 


module.exports = router;
