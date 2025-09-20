const {foodEntry} = require('../controllers/food.controller')

const express = require('express')
const router = express.Router()

router.route('/addInventory').post(foodEntry)

module.exports = router
