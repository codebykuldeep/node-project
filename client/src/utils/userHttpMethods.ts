import axios from "axios";
import { constant } from "../helpers/constants";
import { getToken } from "../helpers/utilityFns";

export async function sendWithdrawal(user_id:string,organization_id:string,amount:Number) {
    try {
        const {data} = await axios.post(constant.SERVER + '/withdrawals/request',{
            user_id:user_id,
            organization_id:organization_id,
            amount:amount
        },{
            headers:{
                'Authorization':getToken(),
            }
        })
        return data.success;
        
    } catch (error) {
        return false;
    }
}