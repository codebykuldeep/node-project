import  jwt from 'jsonwebtoken';
import env from '../constants.js'

function generateToken(payload,expiry='24h'){
    const token = jwt.sign(
        payload,
        env.SECRET,
        {
            expiresIn:expiry
        }
    );
    return token
}

function verifyUser(token){
    const payload = jwt.verify(token,env.SECRET)
    return payload;
}


export {generateToken,verifyUser};