const User = require('../models/users');
const {StatusCodes} = require('http-status-code');

const register = async (req, res) =>{
  const user=await User.create({...req.body});
  const token = user.createJwt();
  req.status(StatusCodes.CREATED).json({user: {role: user.role}, token})
}

const login = async (req, res) =>{
  const {email, password} = req.body;
  if(!email || !password) {
    throw new Error('Please provide email and password');
  }
  const user= await User.findOne({email});
  if(!user){
    throw new Error('Email did not match');
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if(!isPasswordCorrect){
    throw new Error('incorrect password');
  }
  const token = user.createJWT();
  res.status(StatusCode.OK).json({user: {role: user.role}, token})
}

module.exports={
  login,
  register
}
