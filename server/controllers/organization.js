import { actionResponse } from "../helpers/Response.js";
import { addOrganization, getAllOrganization, getOrganization, switchOrganizationStatus, updateOrganization } from "../lib/organization.js";
import { uploadImage } from "../services/cloudinary.js";


export async function handleGetAllOrganization(req,res) {
    try {
        const data = await getAllOrganization();

        return res.json(new actionResponse(200,data,true))
    } catch (error) {
        return res.json(new actionResponse(500,error,false))
    }

}

export async function handleNewRegister(req,res) {
    if(!req.file){
        return res.json(new actionResponse(500,{message:'failed to create org , image issues'},false));
    }
    
    const {name,description,payment_id} = req.body;
    //console.log(await uploadImage(req.file.path));
    console.log(req.body);
    
    try {
        const payment_url = await uploadImage(req.file.path);
        const data = await addOrganization(name,description,payment_id,payment_url);
        return res.json(new actionResponse(200,data,true));

    } catch (error) {
        return res.json(new actionResponse(500,error,false))
    }
}


export async function handleGetOrganization(req,res) {
    const {id} = req.params;
    try {
        const data = await getOrganization(id);
        
        return res.status(200).json(new actionResponse(200,data,true));
    } catch (error) {
        return res.status(500).json(new actionResponse(200,error,false))
    }
    
}


export async function handleOrganizationStatus(req,res) {
    const {id,status} = req.query;
    console.log(req.query);
    
    try {
        const data = await switchOrganizationStatus(id,status);
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,error,false))
    }
}


export async function handleOrgUpdate(req,res) {
    if(!req.file){
        return res.json(new actionResponse(500,error,false));
    }
    
    const {id,name,description,payment_id} = req.body;
    
    console.log(req.body);
    
    try {
        const payment_url = await uploadImage(req.file.path);
        const data = await updateOrganization(id,name,description,payment_id,payment_url);
        return res.json(new actionResponse(200,data,true));

    } catch (error) {
        console.log(error);
        
        return res.json(new actionResponse(500,error,false))
    }
}