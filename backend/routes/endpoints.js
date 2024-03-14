//Add error exception handling and input validation
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createModel = require('../factories/modelFactory');
const User = require('../models/User');
const Nutrition = require('../models/Nutrition');
const { isAlphaLocales } = require('validator');


const router = express.Router();



// Registration endpoint
router.post('/register', async (req, res) => {
    try {
       
   
       const user = createModel('user', req.body);
    
       //Save the user to database
       const newUser = await user.save();

       //create Nutrition model linked to user
       const nData = { user: newUser._id };
       const nModel = createModel('nutrition', nData);
       await nModel.save();
      
       
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

//Dashboard data endpoint
router.get('/dashboard', async (req, res) => {
  try {
    console.log("dashboard request");
    const token = req.headers.authorization.split(' ')[1];
    console.log("Extrcted Token:", token);
    const decoded = jwt.verify(token, secretKey); 
   
    console.log("Decoded UserID:", decoded.userId);
    const user = await User.findById(decoded.userId).select('-password');
    console.log("User Found:", user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    console.log("userId = ", user._id);
    /*const nutrition = await Nutrition.findOne({ user: user._id });
    if(!nutrition) {
      return res.status(404).json(({ error: 'Nutrition data not found'}))
    }
    console.log("Nutrition found:", nutrition);
    */
    // Send back the data needed for the dashboard
    res.json({
      userName: user.userName,
      //calorieIntake: nutrition.calorieIntake,
      // add waterIntake when dashboard has the field
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
      const { userId, addCal, addWat } = req.body;
      const nutrition = await Nutrition.findOne({ userId: userId});
   if (!nutrition){
      return res.status(404).json({ error: 'Nutrition data not found'});
   }
   if (addCal) nutrition.calorieIntake += addCal;
   if (addWat) nutrition.waterIntake += addWat;

   await nutrition.save();


    }  catch (error) {
       res.status(400).json({ error: error.message});
    }
});

module.exports = router;