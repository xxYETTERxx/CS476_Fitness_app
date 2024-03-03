const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    },
    userType: {
        type: String,
        enum: ['basic', 'pro'],
        default: 'basic'
        }
    });


    const bcrypt = require('bcrypt');
    
    userSchema.pre('save', async function(next){
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, salt);
        next();

    });

    const User = mongoose.model('User',userSchema);
    
    module.exports = User;
