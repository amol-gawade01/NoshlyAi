const dotenv = require('dotenv')

dotenv.config();

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const userRouter = require('./routes/user.routes')
const foodRouter = require('./routes/food.routes')



app.use('/api/v1/users',userRouter)
app.use('/api/v1/food',foodRouter)
module.exports = app