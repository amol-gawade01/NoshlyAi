const mongoose = require('mongoose')

const foodSchema = mongoose.Schema({
    foodName:{
         type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
           
    },
    foodQuantity:{
         type:String,
            required:true,
            lowercase:true,
            trim:true,

    },
    foodExpiryDate:{
         type:Date,
            required:true,
         
    }
})

const Food = mongoose.model("Food",foodSchema)
module.exports = Food