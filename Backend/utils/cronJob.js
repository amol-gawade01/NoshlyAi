const cron = require("node-cron");
const Food = require("../models/food.model");
const { io } = require("../server"); // import socket instance
const getRecipe = require("../utils/getRecipe"); // AI recipe generator


function cronJob(){
cron.schedule("*/1  * * * *", async () => { // every 2 mins for demo
  console.log("⏰ Checking expiring foods...");

  const today = new Date();
  const threshold = new Date();
  threshold.setDate(today.getDate() + 1); // next 2 days

  const expiringFoods = await Food.find({
    foodExpiryDate: { $lte: threshold },
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
