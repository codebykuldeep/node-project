import { actionResponse } from "../helpers/Response.js";
import { addAdmin, searchAdmin } from "../lib/admin.js";
import bcrypt from "bcrypt"
import { searchOrganizations } from "../lib/organization.js";
import { getUsersDetails, searchUsers } from "../lib/users.js";
import passwordGenerator from 'generate-password';
import { sendSignUPMailForUser } from "../services/mailServices.js";
import { getSuperAdminHomeDetails } from "../lib/superAdmin.js";

export async function handleAdminRegister(req,res){
    
    const {name,email,number,organization_id} =req.body;

    
    try {
        const password = passwordGenerator.generate({length:10,number:true});
        const hashPassword = await bcrypt.hash(password,3);
        const addUserData = await addAdmin(name,email,hashPassword,number,organization_id);
        delete addUserData.password;
        sendSignUPMailForUser(email,password);
        return res.json(new actionResponse(200,addUserData,true));
   } catch (error) {
          console.log(error);
     
        return res.status(500).json(new actionResponse(500,error,false))
   }
    
}


export async function handleSearch(req,res) {
     const {query} = req.query;
     try{
          const result = await Promise.all([searchOrganizations(query),searchAdmin(query),searchUsers(query)]);
          return res.json(new actionResponse(200,{
               organizations:result[0],
               admins:result[1],
               users:result[2]
          },true))
     }
     catch(error){
          return res.json(new actionResponse(500,error,false))
     }
}


export async function handleSuperAdminHome(req,res) {
     try {
          const data = await getSuperAdminHomeDetails();
          return res.json(new actionResponse(200,data,true))
     } catch (error) {
          console.log(error);
          
          return res.json(new actionResponse(500,error,false))
     }
}

export async function handleGetUserDetailsForProfile(req,res) {
     const {user_id,organization_id}= req.query;
    
     try {
          const data = await getUsersDetails(user_id,organization_id);
          return res.json(new actionResponse(200,data,true))
     } catch (error) {
          console.log(error);
          
          return res.json(new actionResponse(500,error,false))
     }
}