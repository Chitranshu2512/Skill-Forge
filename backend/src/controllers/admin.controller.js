import { Admin } from "../models/admin.model.js";
import {Course} from "../models/course.model.js"
import { User } from "../models/user.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js"
import {asyncHandler} from "../utility/asyncHandler.js"


export const checkAdmin = asyncHandler(async(req, res) => {

  let authorized = true;
  const admin = req.admin
  
  if(!admin){
    authorized = false
  }

    return res.status(200)
    .json(new ApiResponse(200, {authorized}, "Welcome Admin"))
})


export const loginAdmin = asyncHandler(async(req, res) => {

    const {userName, email, password} = req.body

    // check fields
    if(!userName && !email){
        throw new ApiError(400, "username or email is required")
    }

    // find admin in DB
    const admin = await Admin.findOne({
        $or: [{userName}, {email}]
    })

    // if admin does not exist
    if(!admin){
        throw new ApiError(404, "Admin not found")
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);

    // if password is wrong
    if(!isPasswordCorrect){
        throw new ApiError(404, "Bad Password")
    }
   
    const adminAccessToken = admin.generateAccessToken();


    const options = {
        httpOnly: true,
        secure: true
    }

    const adminResponse = {
        _id: admin._id,
        userName: admin.userName,
        email: admin.email,
    };

    return res.status(200)
    .cookie("adminAccessToken", adminAccessToken, options)
    .json(new ApiResponse(200, {adminResponse, adminAccessToken}, "Welcome Admin"))
})


export const logoutAdmin = asyncHandler(async(req, res) => {
    const options = {
        httpOnly: true,
        secure: true 
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out"))
})


export const changePassword = asyncHandler(async(req, res) => {
    const {oldPassword, newPassword, confirmPassword} = req.body

    if(newPassword !== confirmPassword){
        throw new ApiError(400, "new password and confirm password must be same")
    }

    const admin = await Admin.findById(req.admin?._id);

    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid old password")
    }

    admin.password = newPassword
    await admin.save({validateBeforeSave: false});

    return res.status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})


export const addCourse = asyncHandler(async(req, res) => {
    const { title, description, details, imageUrl, discountedPrice, actualPrice, duration } = req.body;

  // Validate required fields
  if (!title || !description || !details || !imageUrl || !actualPrice) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Create new course
  const course = await Course.create({
    title,
    description,
    details,
    imageUrl,
    discountedPrice,
    actualPrice,
    duration,
  });

  // Save course to the database
  const createdCourse = await Course.findById(course._id);


  if(!createdCourse){
    throw new ApiError(500, "something went wrong while adding a new course")
  }


  return res.status(200)
  .json(new ApiResponse(200, createdCourse, "Course added successfully"))
})


export const editCourse = asyncHandler(async(req, res) => {
    const { courseId} = req.params;


    const course = await Course.findById(courseId)

    if(!course){
        throw new ApiError(404, "Course does not exist")
    }
    res.status(200).json(course)

    
})


export const updateCourse = asyncHandler(async(req, res) => {
    const { courseId } = req.params;
    const { title, description, details, imageUrl, discountedPrice, actualPrice, duration } = req.body;

  // Validate required fields
  if (!title || !description || !details || !imageUrl || !actualPrice) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // update course
    const course = await Course.findByIdAndUpdate(courseId, 
        {
        $set: {
            title,
            description,
            details,
            imageUrl,
            discountedPrice,
            actualPrice,
            duration
        }
        },
        {
            new: true
        }
    )
return res.status(200)
.json(new ApiResponse(200, course, "Course updated"))

})


export const getCourses = asyncHandler(async(req, res)=> {

    let authorized = true;
    const admin = req.admin
    
    if(!admin){
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


export const getUsers = asyncHandler(async(req, res)=> {

  let authorized = true;
  const admin = req.admin
  
  if(!admin){
    authorized = false
  }

  try {
      // Fetch all users from the database
      const users = await User.find({});
  
      // If users are found, send them in the response
      if (users.length > 0) {
        res.status(200).json({users, authorized});
      } else {
        // If no users are found, send an empty array
        res.status(200).json([]);
      }
    } catch (error) {
      // Handle errors and send a server error response
      res.status(500).json({ message: 'Server error', error: error.message });
    }
})