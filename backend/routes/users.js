//Add error exception handling and input validation
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require ('../models/User');


const router = express.Router();



// Registration endpoint
router.post('/register', async (req, res) => {
    try {
       const user = new User({
        email: req.body.email,
        password: req.body.password,
        userType: req.body.userType 
       });

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
    const { email, password } = req.body;

    try {
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
      res.json({ token, email: user.email });

    }  catch (error) {
       res.status(400).json({ error: error.message});
    }
});

module.exports = router;