//Add error exception handling and input validation
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createModel = require('../factories/modelFactory');
const User = require('../models/User');
const Nutrition = require('../models/Nutrition');
const { isAlphaLocales } = require('validator');
<<<<<<< HEAD
=======

>>>>>>> 4496bf11ca93dab4a1a307f90df8cbc35d660c9d


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
    console.log('usertype',user.userType);
    res.json({
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
      const { user, calorieIntake, waterIntake } = req.body;
      
      const newNutritionEntry = new Nutrition({
         user: user,
         calorieIntake: parseInt(calorieIntake, 10),
         waterIntake: parseInt(waterIntake, 10),
         date: new Date()
      });
    
      const savedEntry = await newNutritionEntry.save();

      res.json(savedEntry);
      
      } catch(error){
        res.status(400).json ({ error: error.message});
      }


});

//NutritionRetrieve Endpoint

router.get('/nutritionIntake', async (req, res) =>{
  try{
    const {user, startDate, endDate} = req.query;

    const entries = await Nutrition.find({
      user: user,
      date: {
        $gte: startDate,
        $lt: endDate
      }
    });
    console.log(entries);
    entries.forEach(entry => {
      console.log(entry);
    });

    res.json(entries);

    } catch (error){
      console.error("Error fetching Nutrition Data",error);
      res.status(500).send('Server Error');
    }
  });


module.exports = router;
