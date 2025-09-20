const {registerUser,loginUser} = require('../controllers/user.controller')
const express = require('express')
const router = express.Router();

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)


module.exports = router;