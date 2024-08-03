import mongoose, {Schema} from "mongoose"

const courseSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },

    descriptiion: {
        type: String,
        required: true,
        trim: true
    },

    imageUrl:{
        type: String,
        required: true,
        trim: true
    },

    discountedPrice: {
        type: Number,
        min: 0
    },

    actualPrice: {
        type: Number,
        required: true,
        min: 0
    },

    duration: {
        type: String,
        trim: true
    }

},{timestamps: true})

export const Course = mongoose.model("Course", courseSchema);