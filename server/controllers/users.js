import { generateToken, verifyUser } from '../auth/auth.js';
import { actionResponse, ApiUserResponse } from '../helpers/Response.js';
import { addAdmin, getAllAdmin } from '../lib/admin.js';
import { getSuperAdmin } from '../lib/superAdmin.js'
import bcrypt from "bcrypt"
import passwordGenerator from 'generate-password';
import { addUsers, getAdmin, getAllUsers, getSpecificUser, getUserByOrganization, searchForUser, switchUserStatus, updateUser } from '../lib/users.js';
import { sendSignUPMailForUser } from '../services/mailServices.js';


async function getUser(req,res) {
    
    const {email , password} = req.body;

    if(!email || !password){
        return res.json(new ApiUserResponse(400,{error:{message:'parameters are missing'}}))
    }

    try {
        const user = await searchForUser(email);
    
        if(!user){
            return res.status(200).json(new ApiUserResponse(404,{message:'User donot exists'},null,false))
        }
        const passwordCheck = bcrypt.compareSync(password,user.password);
        if(!passwordCheck){
            return res.status(200).json(new ApiUserResponse(401,{message:'Incorrect credentials'},null,false))
        }
        
        delete user.password;
        const token = generateToken(user);
        
        return res.status(200).json(
            new ApiUserResponse(200
                ,user,
                token,
                true
            )
        )
    } catch (error) {
        return res.json(new ApiUserResponse(404,{message:error.message},null,false))
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
        return res.json(new actionResponse(500,error,false))
    }
}


export async function handleGetAllUsers(req,res) {
    try {
        const data = await getAllUsers();
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(500,error,false))
    }
}


export async function handleGetUserByOrg(req,res) {
    const {id} = req.params;
    console.log(id);
    
    try {
        const data = await getUserByOrganization(id);
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,error,false))
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
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,error,false))
    }
}


export async function handleUserStatus(req,res) {
    const {id,status,role} = req.query;

    try {
        const data = await switchUserStatus(id,status,role)
        return res.status(200).json(new actionResponse(200,data,true)); 
    } catch (error) {
        return res.status(500).json(new actionResponse(500,undefined,false));
    }
}


export async function handleGetUserDetails(req,res) {
    const {id} = req.params;
    console.log('Here');
    
    try {
        const user  = await getSpecificUser(id);
        if(user){
            console.log(user);
            
            return res.json(new actionResponse(200,user,true)); 
        }
        else{
            return res.status(400).json(new actionResponse(400,undefined,true))
        };
    } catch (error) {
        console.log(error);
        
        return res.json(new actionResponse(500,error,false));
    }
}

export async function handleUpdateUser(req,res) {
    const {name,email,number} = req.body;
    const role = req.user.role;
    
    try {
        
        const data = await updateUser(req.user,email,name,number,role);
        return res.status(200).json(new actionResponse(200,{message:'Details updated successfully'},true));
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(new actionResponse(500,{message:'Details updation failed',error},false));
    }
    
}



export async function handleCreateUser(req,res){
    console.log(req.body);
    const {name ,email ,number ,interest ,organization_id } =req.body; 
    
    try {
        const password = passwordGenerator.generate({length:10,number:true});
        const hashPassword = await bcrypt.hash(password,3);
        //const hashPassword = '123456';
        const data = await addUsers(name,email,hashPassword,number,interest,organization_id);
        sendSignUPMailForUser(email,password);
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        console.log(error);
        
        return res.json(new actionResponse(500,error,false));
    }
}


export {getUser,handleAddAdmin}