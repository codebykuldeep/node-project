import { actionResponse } from "../helpers/Response.js";
import { addAdmin } from "../lib/admin.js";
import bcrypt from "bcrypt"
import { searchOrganizations } from "../lib/organization.js";

export async function handleAdminRegister(req,res){
    
    const {name,email,number,organization_id} =req.body;

    
    try {
        // const password = passwordGenerator({length:10,number:true});
        // const hashPassword = await bcrypt.hash(password,3);
        const hashPassword = '123456';
        const addUserData = await addAdmin(name,email,hashPassword,number,organization_id);
        delete addUserData.password;
        return res.json(new actionResponse(200,{user:addUserData},true));
   } catch (error) {
        return res.json(new actionResponse(200,{error},false))
   }
    
}


export async function handleSearch(req,res) {
     const {query} = req.query;
     try{
          const organization = await searchOrganizations(query);
          return res.json(new actionResponse(200,{organization},true))
     }
     catch(error){
          return res.json(new actionResponse(500,{error},false))
     }
}