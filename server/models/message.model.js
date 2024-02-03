import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: [ true, "Each message should have a sender." ]
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [ true, "Each message should have a sender." ]
    },
    text: {
        type: String,
        required: [ true, "Each messsage should have the content." ],
    }
}, { timestamps: true });

export const Message = mongoose.model( "Message", messageSchema );