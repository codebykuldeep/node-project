import { generateToken, verifyUser } from '../auth/auth.js';
import { actionResponse, ApiUserResponse } from '../helpers/Response.js';
import { addAdmin } from '../lib/admin.js';
import { getSuperAdmin } from '../lib/superAdmin.js'
import bcrypt from "bcrypt"
import passwordGenerator from 'generate-password';


async function getUser(req,res) {
    
    const {email , password} = req.body;

    if(!email || !password){
        return res.json(new ApiUserResponse(400,{error:{message:'parameters are missing'}}))
    }

    const user = await getSuperAdmin(email);
    
    if(!user){
        return res.status(404).json(new ApiUserResponse(404))
    }
    
    delete user.password;
    user.role ='SUPER_ADMIN';
    const token = generateToken(user);
    
    return res.status(200).json(
        new ApiUserResponse(200
            ,{
                user
            },
            token
        )
    )
};



async function addUser(req,res){
    const token = req.headers['authorization'].split(' ')[1];
    const userData = verifyUser(token)
    const user = getSuperAdmin(userData.email);

    const {name,email,number,organization_id} =req.body;

    if(user && userData.role === 'SUPER_ADMIN'){
        
       try {
            const password = passwordGenerator({length:10,number:true})
            const hashPassword = await bcrypt.hash(password,3);
            const addUserData = await addAdmin(name,email,hashPassword,number,organization_id);
            delete addUserData.password;
            return res.json(new actionResponse(200,{user:addUserData},true));
       } catch (error) {
            return res.json(new actionResponse(200,{error},false))
       }

    }
    
}



export {getUser,addUser}