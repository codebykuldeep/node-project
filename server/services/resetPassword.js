import { generateToken } from '../auth/auth.js';
import env from '../constants.js';

const CLIENT = env.CLIENT;

const resetMap = new Map();

export function generateResetLink(email){
    const randomInt = (10000*Math.random());
    const token  = generateToken(randomInt);
    resetMap.set(token,email);

    const resetLink = CLIENT + '/' + 'reset' + `?v=${token}`;
    return resetLink;

}


export function verifyResetToken(token){
    if(resetMap.has(token)){
        const email = resetMap.get(token);
        resetMap.delete(token);
        return email;
    }
    return undefined;
}