import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js"
import {asyncHandler} from "../utility/asyncHandler.js"
import {Course} from "../models/course.model.js"


export const registerUser = asyncHandler(async(req, res) => {
    const {fullName, email, phoneNumber, institute} = req.body

    // valldate the fields
    if([fullName, email, phoneNumber].some((field) => field === "")){
        throw new ApiError(404, "All fields are required") 
    }

    const options = {
      httpOnly: true,
      secure: true
  }

    // check is user already existed
    try {
      const existingUser = await User.findOne({email});
  
      if(existingUser){
          const accessToken = existingUser.generateAccessToken();
          return res.status(200)
          .cookie("accessToken", accessToken, options)
          .json(new ApiResponse(200, {existingUser, accessToken}, "User already exists"))
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
  
      const accessToken = createdUser.generateAccessToken();
  
      return res.status(200)
      .cookie("accessToken", accessToken, options)
      .json(new ApiResponse(200, {createdUser, accessToken}, "user registered successfully"))
  
    } catch (error) {
      console.log(error)
    }
})


export const getCourses = asyncHandler(async(req, res)=> {

    let authorized = true;
    const user = req.user
    
    if(!user){
      authorized = false
    }

    try {
        // Fetch all courses from the database
        const courses = await Course.find({});
    
        // If courses are found, send them in the response
        if (courses.length > 0) {
          res.status(200).json({courses, authorized});
        } else {
          // If no courses are found, send an empty array
          res.status(200).json([]);
        }
      } catch (error) {
        // Handle errors and send a server error response
        res.status(500).json({ message: 'Server error', error: error.message });
      }
})