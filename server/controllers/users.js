import { generateToken, verifyUser } from '../auth/auth.js';
import { actionResponse, ApiUserResponse } from '../helpers/Response.js';
import { addAdmin, getAllAdmin } from '../lib/admin.js';
import { getSuperAdmin } from '../lib/superAdmin.js'
import bcrypt from "bcrypt"
import passwordGenerator from 'generate-password';
import { getAdmin, getAllUsers, getUserByOrganization, searchForUser } from '../lib/users.js';


async function getUser(req,res) {
    
    const {email , password} = req.body;

    if(!email || !password){
        return res.json(new ApiUserResponse(400,{error:{message:'parameters are missing'}}))
    }

    try {
        const user = await searchForUser(email);
    
        if(!user){
            return res.status(404).json(new ApiUserResponse(404))
        }
        
        delete user.password;
        const token = generateToken(user);
        
        return res.status(200).json(
            new ApiUserResponse(200
                ,{
                    user
                },
                token
            )
        )
    } catch (error) {
        return res.json(new ApiUserResponse(404,{message:error.message}))
    }
};



async function handleAddAdmin(req,res){
    
    const {name,email,number,organization_id} =req.body;

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


export async function handleGetAllAdmins(req,res) {
    try {
        const data = await getAllAdmin();
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,{error},false))
    }
}


export async function handleGetAllUsers(req,res) {
    try {
        const data = await getAllUsers();
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(500,{error},false))
    }
}


export async function handleGetUserByOrg(req,res) {
    const {id} = req.params;
    console.log(id);
    
    try {
        const data = await getUserByOrganization(id);
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,{error},false))
    }
}


export async function handleGetAdmin(req,res) {
    const {id} = req.params;
    console.log(id);
    
    try {
        const data = await getAdmin(id);
        if(!data){
            return res.json(new actionResponse(404,undefined,false));
        }
        return res.json(new actionResponse(200,{admin:data},true));
    } catch (error) {
        return res.json(new actionResponse(200,{error},false))
    }
}



export {getUser,handleAddAdmin}