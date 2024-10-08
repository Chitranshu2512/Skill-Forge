import mongoose, {Schema} from "mongoose"
import jwt from "jsonwebtoken"

const userSchema = new Schema({
    fullName:{
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },

    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },

    institute: {
        type: String,
        trim: true
    }

}, {timestamps: true})



userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        fullName: this.fullName
    },

    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User", userSchema)