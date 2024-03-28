require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/endpoints');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json()); //parse JSON bodies
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log('Server is running on port:' + port );
})


app.use('/api/auth', authRoutes);

mongoose.connect('mongodb+srv://ottenson:Th3Littl3Whit3D3vil@gymgenius.lnng63x.mongodb.net/')

.then (() => console.log ('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));