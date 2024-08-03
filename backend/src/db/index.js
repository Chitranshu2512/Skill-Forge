import mongoose from 'mongoose'
import { DB_NAME } from '../contacts.js' 


mongoose.set('strictQuery', true);
const connectDB = async() => {
    try {
        const connectedInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected`)
    } catch (error) {
        console.log("failed to connect with DB");
        console.log("error", error)
    }
}


export default connectDB