const Food = require("../models/food.model");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const foodEntry = asyncHandler(async (req, res, next) => {
  const { foodName, foodQuantity, foodExpiryDate } = req.body;

  if (
    [foodName, foodQuantity, foodExpiryDate].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const food = await Food.create({
    foodName,
    foodQuantity,
    foodExpiryDate,
  });

  if (!food) {
    throw new Error(401, "error while adding food to inventry");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, food, "Food added to inventry succesfully"));
});

const getFoodDetails = asyncHandler(async (req, res, next) => {
  try {
    const today = new Date();
today.setHours(0, 0, 0, 0); // start of today

const startThreshold = new Date();
startThreshold.setDate(today.getDate() + 2); // 2 days later
startThreshold.setHours(0, 0, 0, 0); // start of that day

const endThreshold = new Date(startThreshold);
endThreshold.setHours(23, 59, 59, 999); // end of that day

    const totalFoods = await Food.countDocuments();
    const expiringSoon = await Food.countDocuments({
  foodExpiryDate: { $gte: startThreshold, $lte: endThreshold },
});


    const expired = await Food.countDocuments({
      foodExpiryDate: { $lt: today },
    });
    const safe = totalFoods - expiringSoon - expired;

    return res
    .status(200)
    .json(new ApiResponse(200,{expiringSoon:expiringSoon,expired:expired,safe:safe},"Food data fetch successfully"))
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
});

module.exports = { foodEntry,getFoodDetails };
