import { User } from '../models/user.model.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import generateAccessAndRefreshToken from './utils/GenerateToken.js';

const registerUser = asyncHandler( async ( req, res, next ) => {

    const { name, dob, gender, phone, disability, password } = req.body;

    console.log( name, dob, gender, phone, disability, password );

    if([ name, gender, disability, password ].some( ( element ) => element?.trim() === "" )){
        throw new ApiError(
            400,
            "All fields are compulsory"
        )
    }

    const existingUser = await User.find({
        phone
    });

    if( Array.isArray( existingUser ) && existingUser.length > 0 ){
        console.log( `The user is ${existingUser}` );
        throw new ApiError(
            409,
            "User already exists."
        )
    }

    const createdUser = await User.create({
        name, 
        dob,
        gender,
        phone,
        disability,
        password
    });

    if( !createdUser ){
        throw new ApiError(
            500,
            "Couldnot create the account."
        )
    }

    const user = await User.findById( createdUser?._id ).select( "-id -refreshToken" );

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            user,
            "Account successfully created."
        )
    );
});

const loginUser = asyncHandler( async ( req, res, next ) => {
    const { phone, password } = req.body;

    if( !phone ){
        throw new ApiError(
            400,
            "The phone number cannot be empty."
        )
    }

    const existingUser = await User.findOne(
        {
            phone: phone
        }
    );

    if( !existingUser ){
        throw new ApiError(
            404,
            "User with this phone number doesnot exists."
        )
    }

    const isPasswordCorrect = await existingUser.isPasswordCorrect( password );

    if( !isPasswordCorrect ){
        throw new ApiError(
            401,
            "Wrong password."
        )
    }

    const options = {
        httpOnly: true,
        secure: true
    };

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken( existingUser._id );

    return res
    .status(200)
    .cookie( "access token", accessToken, options )
    .cookie( "refresh token", refreshToken, options )
    .json(
        new ApiResponse(
            200,
            "User successfully logged in."
        )
    );
} );

const logoutUser = asyncHandler( async ( req, res, next ) => {
    User.findByIdAndUpdate(
        req.user?._id,
        {
            $unset: {
                refreshToken: 1
            },
        },
        {
            new: true
        }
    );


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status( 200 )
    .clearCookie( "access token", options )
    .clearCookie( "refresh token", options )
    .json(
        new ApiResponse(
            200,
            {},
            "User logged out successfully."
        )
    );
} );

export { registerUser, loginUser, logoutUser };