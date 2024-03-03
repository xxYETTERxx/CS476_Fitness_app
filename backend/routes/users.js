//Add error exception handling and input validation

const express = require('express');
const bcrypt = require('bcrypt');
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

module.exports = router;