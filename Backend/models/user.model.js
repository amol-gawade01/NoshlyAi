const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema(
    {
        retaurantName:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true

        },
        email:{
             type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
        },
        password:{
            type:String,
            required:[true,"Password is required"]
        }
    }
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next;
    this.password = await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}


userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        {
            _id: this._id,
            firstName: this.firstName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:'24h'}
    );

    return token;
};

const User = mongoose.model("User",userSchema)
module.exports = User 