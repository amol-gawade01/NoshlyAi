const jwt = require("jsonwebtoken");
const User = require("../models/user.model");


const verifyJwt = async  (req,res,next) => {
  const token = req.headers['token']  || req.cookies.token;

  
  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decoded?._id); 
    console.log('user',user)
    if (!user) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = verifyJwt