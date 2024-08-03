import jwt from "jsonwebtoken"
import { asyncHandler } from "../utility/asyncHandler.js"
import { ApiError } from "../utility/ApiError.js"
import { Admin } from "../models/admin.model.js"

export const verifyJWTToken = asyncHandler(async(req, res, next) => {
    try {
        // find token from cookies
        const token = req.cookies?.accessToken
        
        // if token is not present
        if(!token){
            throw new ApiError(401, "unauthorized access")
        }
    
        // decode the JWT token
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        // find admin with the help of decodedToken
        const admin = await Admin.findById(decodedToken._id).select("-password")
    
        // if admin not found
        if(!admin){
            throw new ApiError(401, "Invalid Access Token")
        }
    
        req.admin = admin
        next();

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})