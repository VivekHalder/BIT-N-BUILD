import { Chat } from "../models/chat.model.js";
import { User } from "../models/user.model.js"
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const createChat = asyncHandler( async ( req, res, next ) => {
    const { firstID, secondID } = req.body;

    try {
        if( [ firstID, secondID ].some( ( element ) => ( element.trim() === "" ) ) ){
            throw new ApiError(
                400,
                "We need to have both the sender's ID and a reveiver's ID for a chat."
            )
        }
    
        const existingChat = await Chat.findOne({
            members: { $all: [ firstID, secondID ] }
        });
    
        if( existingChat ){
            return res.
            status(200)
            .json(
                new ApiResponse(
                    200,
                    existingChat,
    
                    "Chat successfully retrieved."
                )
            )
        }
    
        const newChat = await Chat.create({
            members: [ firstID, secondID ]
        });
    
    
        if( !newChat ){
            throw new ApiError(
                500,
                "Couldnot create the chat."
            )
        }
    
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                newChat,
                "Chat successfully created."
            )
        );
    } catch (error) {
        console.error(`Error occured while creating the new chat. Error: ${ error.message }`)
    }
} );

const findUserChats = asyncHandler( async ( req, res, next ) => {
    const { userID } = req.params;

    const existingUser = await User.findById( userID ).select( "-password -refreshtoken" );

    if( !existingUser ){
        throw new ApiError(
            404,
            "User not found."
        );
    }

    const chats = await Chat.find({
        members: { $in: [ userID ] }
    })

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            chats,
            "All chats retrieved."
        )
    );
} );

const findChat = asyncHandler( async ( req, res, next ) => {
    try {
        const { firstID, secondID } = req.params;
    
        const existingFirstUser = await User.findByID( firstID ).select( "-password -refreshToken" ); 
    
        if( !existingFirstUser ){
            throw new ApiError(
                404,
                "First user not found."
            )
        }
    
        const existingSecondUser = await User.findByID( secondID ).select( "-password -refreshToken" );
    
        if( !existingSecondUser ){
            throw new ApiError(
                404,
                "Second user not found."
            )
        }
    
        const chat = await Chat.findOne({
            members: { $all: [ firstID, secondID ] }
        });
    
        return res.
        status(200)
        .json(
            200,
            chat,
            "Personal DMs retrieved."            
        );
    } catch (error) {
        console.error(`Error occured while retrieving the DMs. Error: ${error.message}`);
    }
} );

export { createChat, findUserChats, findChat };