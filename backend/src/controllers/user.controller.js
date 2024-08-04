import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js"
import {asyncHandler} from "../utility/asyncHandler.js"


export const registerUser = asyncHandler(async(req, res) => {
    const {fullName, email, phoneNumber, institute} = req.body

    // valldate the fields
    if([fullName, email, phoneNumber].some((field) => field === "")){
        throw new ApiError(404, "All fields are required") 
    }

    // check is user already existed
    const existingUser = await User.findOne({email});

    if(existingUser){
        return res.status(200)
        .json(new ApiResponse(200, {}, "User already exists"))
    }


    // register a new user
    const user = await User.create({
        fullName,
        email,
        phoneNumber,
        institute
    })

    const createdUser = await User.findById(user._id)

    // check if user registered ssuccessfully
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering a user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )

})