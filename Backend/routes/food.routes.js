const {foodEntry,getFoodDetails} = require('../controllers/food.controller')

const express = require('express')
const router = express.Router()

router.route('/addInventory').post(foodEntry)
router.route('/getStats').get(getFoodDetails)

module.exports = router
