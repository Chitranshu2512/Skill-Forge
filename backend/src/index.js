import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { Admin } from "./models/admin.model.js";
import {ApiError} from "./utility/ApiError.js"

dotenv.config({
    path: '/.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 3000,
        () => {
            console.log(`Server is running at port ${process.env.PORT}`)
        }
    )
})
.catch((err) => {
    console.log(`Error Database is not connecting`, err)
})


async function createAdminUser(){
    try {
        const existedAdmin = await Admin.findOne({userName: process.env.ADMIN_USERNAME}).select("-password")

        if(existedAdmin){
            console.log("Admin Exist: ", existedAdmin)
            return
        }

        const admin = await Admin.create(
            {
                userName: process.env.ADMIN_USERNAME.toLowerCase(),
                email: process.env.ADMIN_EMAIL.toLowerCase(),
                password: process.env.ADMIN_PASSWORD
            }
        )

        const createdAdmin = await Admin.findById(admin._id).select("-password")

        if(!createdAdmin){
            console.log("something went wrong while registering admin")
        }

        console.log("Admin registered")
        return 

    } catch (error) {
        console.log("problem in creating admin ",error);
    }
}

createAdminUser()