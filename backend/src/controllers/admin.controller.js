import { Admin } from "../models/admin.model.js";
import { ApiError } from "../utility/ApiError.js";
import { ApiResponse } from "../utility/ApiResponse.js"
import {asyncHandler} from "../utility/asyncHandler.js"


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
   
    const accessToken = admin.generateAccessToken();


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
    .cookie("accessToken", accessToken, options)
    .json(new ApiResponse(200, {adminResponse, accessToken}, "Admin logged in"))
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
    const {oldPassword, newPassword, confirmPassword} = req.bodt

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


// this is undefined, have to do it
export const addCourse = asyncHandler(async(req, res) => {

})

// this is userRegister
export const userRegister = asyncHandler(async(req, res) => {})