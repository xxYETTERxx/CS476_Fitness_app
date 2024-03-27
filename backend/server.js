require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/endpoints');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); //parse JSON bodies

app.get('/', (req, res) => {
  res.json({ message: 'API is running...' });
});

const port = process.env.PORT || 10000;


mongoose.connect(process.env.MONGODB_URI)
.then (() => console.log ('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

app.use('/api/auth', authRoutes);

app.listen(port,'0.0.0.0', () => {
    console.log('Server is running on port:' + port );
})




