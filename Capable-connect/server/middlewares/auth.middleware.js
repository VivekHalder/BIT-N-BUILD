import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { User } from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = asyncHandler( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if( !token ){
            throw new ApiError(
                404,
                "User not logged in."
            );
        }
    
        const decodedToken = jwt.verify( token, process.env.ACCESS_TOKEN_SECRET );
    
        const user = await User.findById( decodedToken?._id ).select( "-password -refreshToken" );
    
        if( !user ){
            throw new ApiError(
               401,
               "Access token expired or already used." 
            )
        }
    
        req.user = user;
    
        next();
    } catch (error) {
        console.log(`Error occured while decoding the user's token. Error: ${ error.message }.`)
    }
} );