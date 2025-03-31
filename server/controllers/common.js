import bcrypt from 'bcrypt';
import { actionResponse } from '../helpers/Response.js';
import { updatePassword } from '../lib/common.js';
import { searchForUser } from '../lib/users.js';
import { sendForgetPasswordMail } from '../services/mailServices.js';
import { verifyResetToken } from '../services/resetPassword.js';


export async function handleUpdatePassword(req,res){
    const user = req.user;
    const {old_password,password} = req.body;
    console.log(req.body);
    
    try {
        const hashedPassword = user.password;
        const passwordCheck = bcrypt.compareSync(old_password,hashedPassword);
        if(passwordCheck){
            const hashedPwd = bcrypt.hashSync(password,3);
            await updatePassword(user,hashedPwd);
            return res.json(new actionResponse(200,{message:'password updated'},true));
        }
        else{
            return res.json(new actionResponse(400,{message:'old password is incorrect'},false));
        }
    } catch (error) {
        console.log(error);
        
        return res.json(new actionResponse(500,{message:'something went wrong'},false));
    }
}



export async function handleForgetPassword(req,res) {
    const email = req.body.email;
    const token = req.body.token;
    if(token){
        const password = req.body.password;
        const email = verifyResetToken(token);
        if(email){
            const user = await searchForUser(email);
            const hashedPwd = bcrypt.hashSync(password,3);
            await updatePassword(user,hashedPwd);
            return res.json(new actionResponse(200,{message:'password updated'},true));
            
        }
        else{
            return res.json(new actionResponse(400,{message:'The reset link is invalid or has expired. Please request a new password reset.'},false));
        }
    }
    else{
        if(!email){
            return res.json(new actionResponse(400,{message:'email is missing.bad request'},false));
        }
        try {
            const user = await searchForUser(email);
            sendForgetPasswordMail(email,user);
            return res.json(new actionResponse(200,{message:'Request Processed. check mail'},true)); 
        } catch (error) {
            return res.json(new actionResponse(500,{message:error.message},false));
        }
    }
    
}