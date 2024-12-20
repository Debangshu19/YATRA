const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // for hashing and comparing password
const jwt = require('jsonwebtoken'); // for authentication

const userSchema = new mongoose.Schema({ // creating schema
    fullname:{
        firstname:{
            type: String,
            required: true,
            minlength: [3, 'First name must be atleast 3 characters long']
        },
        lastname:{
            type: String,
            minlength: [3, 'Last name must be atleast 3 characters long']
        }
    },
    email:{
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be 5 characters long']
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId:{ //live tracking
        type: String,
    },
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id : this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema); // creating model

module.exports = userModel;