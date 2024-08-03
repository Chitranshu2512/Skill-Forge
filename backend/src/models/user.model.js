import mongoose, {Schema} from "mongoose"

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



export const User = mongoose.model("User", userSchema)