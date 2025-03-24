import bcrypt from 'bcrypt';
import { actionResponse } from '../helpers/Response.js';
import { updatePassword } from '../lib/common.js';


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