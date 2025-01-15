import axios from "axios";
import { env } from "../helpers/constants";
import { getToken } from "../helpers/utilityFns";

export async function getOrganizationData(id:string) {
    const {data} = await axios.get(env.SERVER +'/organization/'+ id,{
        headers:{
            'Authorization':getToken(),
        }
    })
    
 return (data.data.organization);
}