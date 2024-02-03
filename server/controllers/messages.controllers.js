import { Message } from "../models/message.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createMessage = asyncHandler( async ( req, res, next ) => {
    const { chatID, senderID, text } = req.body;

    try {
        const message = await Message.create({
            chatID,
            senderID,
            text
        });
    
        if( !message ){
            throw new ApiError(
                400,
                "Couldnot create the message."
            )
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                message,
                "Message created successfully."
            )
        );
    } catch (error) {
        console.error(`Error occured while creating the message. Error: ${ error.message }`);
    }

} );


const getMessages = asyncHandler( async ( req, res, next ) => {
    const { chatID } = req.params;

    if( !chatID ){
        throw new ApiError(
            404,
            "Chat ID not found."
        );
    }

    const messages = await Message.find({ 
        chatID: chatID
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            messages,
            "All messages retrieved."
        )
    )

} );

export { createMessage, getMessages };