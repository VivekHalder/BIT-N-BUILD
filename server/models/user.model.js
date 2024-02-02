import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Name is required for registration." ],
        unique: false
    },
    dob: {
        type: Date,
        required: [ true, "Date of Birth is required for registration." ]
    },
    gender: {
        type: String,
        enum: [ "Male", "Female" ],
        required: true
    }, 
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    disability: {
        type: String,
        enum: [ "Deaf & Dumb", "Blind" ],
        required: true
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

userSchema.pre( 'save', async function( next ){
    if(!this.isModified( "password" )) return next();

    this.password = await bcrypt.hash( this.password, 10 );
    next();
} );

userSchema.methods.isPasswordCorrect = async function ( enteredPassword ){
    return await bcrypt.compare( enteredPassword, this.password );
};

userSchema.methods.createAccessToken = function (){
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            dob: this.dob,
            phone: this.phone,
            gender: this.gender,
            disability: this.disability   
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

userSchema.methods.createRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model( "User", userSchema );