import { actionResponse } from "../helpers/Response.js";
import { addOrganization, getAllOrganization } from "../lib/organization.js";


export async function handleGetAllOrganization(req,res) {
    try {
        const data = await getAllOrganization();

        return res.json(new actionResponse(200,{organizations:data},true))
    } catch (error) {
        return res.json(new actionResponse(500,{error},false))
    }

}

export async function handleNewRegister(req,res) {
    const {name,description,payment_id,payment_url} = req.body;
    
    try {
        const data = await addOrganization(name,description,payment_id,payment_url);
        return res.json(new actionResponse(200,{organization:data},true));

    } catch (error) {
        return res.json(new actionResponse(500,{error},false))
    }
}