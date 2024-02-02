import { User } from "../../models/user.model.js";

const generateAccessAndRefreshToken = async ( userID ) => {
    try {
        const user = await User.findById( userID );
    
        const accessToken = user.createAccessToken();
        const refreshToken = user.createRefreshToken();
    
        user.refreshToken = refreshToken;
        user.save( { validationBeforeSave: false } );
    
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(`Error occured while generating the access and refresh token. Error: ${ error.message }.`)
    }
}

export default generateAccessAndRefreshToken;