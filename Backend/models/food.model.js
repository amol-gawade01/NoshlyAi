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
         
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
})

const Food = mongoose.model("Food",foodSchema)
module.exports = Food