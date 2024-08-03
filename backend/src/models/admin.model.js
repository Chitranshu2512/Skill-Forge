import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminSchema = new Schema({
    userName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})


// 'pre' middleware
adminSchema.pre("save", async function(next) {
    // if password is not changed
    if(!this.isModified("password")) return next()

    // encrypt passowrd
    this.password = await bcrypt.hash(this.password, 10);
    next()
})

// check password method
adminSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}


adminSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        userName: this.userName
    },

    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}



export const Admin = mongoose.model("Admin", adminSchema)