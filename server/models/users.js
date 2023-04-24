const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    maxlength: [50, 'name should not be more that 50 characters'],
    minlength: [3, 'name should be 3 characters long']
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: [true, "Email already exist"],
    match:[/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please provide a valid email']
  },
  password : {
    type: String,
    minlength: [6, "password should be atleast 6 character long"],
    required: [true, "please provide a password"],
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'password must be 6 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character:']
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
})

UserSchema.pre('save', async function(){
   const salt=await bcrypt.genSalt(10);
   this.password=await bcrypt.hash(this.password,salt);
})

UserSchema.methods.createJWT = function(){
  return jwt.sign(
    {userId: this._id, role: this.role},
    process.env.JWT_SECRET,
    {
      expriresIn: process.env.JWT_LIFETIME
    }
  )
}

module.exports = mongoose.model('User', UserSchema)
