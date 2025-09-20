const Food = require("../models/food.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler")

const foodEntry = asyncHandler(async(req,res,next) => {
    const {foodName,foodQuantity,foodExpiryDate} = req.body
    
    if ([foodName, foodQuantity, foodExpiryDate].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
      }

    const food = await Food.create({
        foodName,
        foodQuantity,
        foodExpiryDate
    })

    if(!food){
        throw new Error(401,"error while adding food to inventry")
    }
    
    return res
    .status(200)
    .json(new ApiResponse(200,food,"Food added to inventry succesfully"))

})

const getFoodDetails = asyncHandler(async(req,res,next) => {
     
})

module.exports = {foodEntry}