//Add error exception handling and input validation
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createModel = require('../factories/modelFactory');
const User = require('../models/User');


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
      
      //createModel('nutrition')
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

module.exports = router;