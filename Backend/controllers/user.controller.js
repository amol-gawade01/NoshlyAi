const User = require("../models/user.model");
const mongoose = require("mongoose");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const asyncHandler = require('../utils/asyncHandler');


const registerUser = asyncHandler(async (req, res, next) => {
  const { retaurantName, email, password } = req.body;

  if ([retaurantName, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    email,
  });

  if (existedUser) {
    throw new ApiError(409, "User with email already exist");
  }

  const user = await User.create({
    retaurantName:retaurantName,
    email:email,
    password:password,
  });

  const createdUser = await User.findById(user._id).select("-password ");

  if (!createdUser) {
    throw new ApiError(500, "User not created while registering ");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created Successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throw new ApiError(404, "User Does not exist");
  }
  
  const isPasswordValid = await user.isPasswordCorrect(password);
  
    if(!isPasswordValid){
      throw new ApiError(401,"Passwoord is Invalid")
    }
  
  const token = await user.generateAuthToken();

  const options = {
    httpOnly:true,
    secure:process.env.NODE_ENV === 'production'
  }

  return res
    .status(201)
    .cookie("token",token,options)
    .json(new ApiResponse(200, {user,token}, "User login Successfully"));

});

module.exports = {
    registerUser,
    loginUser
}
