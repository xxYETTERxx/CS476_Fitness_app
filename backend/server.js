
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/users');

const app = express();

const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log('Server is running on port ${port}');
})

app.use(express.json()); //parse JSON bodies

app.use('/api/auth', authRoutes);
s/
mongoose.connect('mongodb://127.0.0.1:27017/fitnessAppDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

.then (() => console.log ('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));