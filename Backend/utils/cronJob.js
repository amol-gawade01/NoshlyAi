const cron = require("node-cron");
const Food = require("../models/food.model");
const { io } = require("../server"); // import socket instance
const getRecipe = require("../utils/getRecipe"); // AI recipe generator


function cronJob(){
cron.schedule("*/1 * * * *", async () => { // every 2 mins for demo
  console.log("⏰ Checking expiring foods...");
const today = new Date();
today.setHours(0, 0, 0, 0); // start of today

const startThreshold = new Date();
startThreshold.setDate(today.getDate() + 2); // 2 days later
startThreshold.setHours(0, 0, 0, 0); // start of that day

const endThreshold = new Date(startThreshold);
endThreshold.setHours(23, 59, 59, 999); // end of that day

  const expiringFoods = await Food.find({
    foodExpiryDate: {$gte: startThreshold, $lte: endThreshold },
  });

  if (expiringFoods.length > 0) {
    console.log(expiringFoods)
    // Get all inventory items
    const inventory = await Food.find();

    // // Call AI to suggest recipes
    const recipe = await getRecipe(expiringFoods, inventory);
    console.log(recipe)
    // Send notification to frontend via socket
    // io.emit("foodReminder", {
    //   expiringFoods,
    //   recipe,
    // });
}

});}

module.exports = cronJob
