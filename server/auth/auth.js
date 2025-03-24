import  jwt from 'jsonwebtoken';
import config from '../constants.js'

function generateToken(payload,expiry='24h'){
    const token = jwt.sign(
        payload,
        config.SECRET,
        // {
        //     expiresIn:expiry
        // }
    );
    return token
}

function verifyUser(token){
    const payload = jwt.verify(token,config.SECRET)
    return payload;
}


export {generateToken,verifyUser};