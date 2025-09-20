const mongoose = require('mongoose');

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to DB");
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
}

module.exports = connectToDB;
