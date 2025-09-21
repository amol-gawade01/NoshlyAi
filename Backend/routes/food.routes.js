const {foodEntry,getFoodDetails} = require('../controllers/food.controller')

const express = require('express')
const router = express.Router()
const verifyJwt = require('../middlewares/auth')

router.route('/addInventory').post(verifyJwt,foodEntry)
router.route('/getStats').get(verifyJwt,getFoodDetails)

module.exports = router
