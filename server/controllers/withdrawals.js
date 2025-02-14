import { actionResponse } from "../helpers/Response.js";
import { createWithdrawalReq, deleteWithdrawalReq, getOrganizationWithdrawals, getUserWithdrawals, updateWithdrawalReq } from "../lib/withdrawals.js";

export async function handlegetUserWithdrawal(req,res){
    const {id} = req.params;
    try {
        const data = await getUserWithdrawals(id);
        return res.status(200).json(new actionResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new actionResponse(500,null,false))
    }
}


export async function handleWithdrawalReq(req,res) {
    const {user_id,organization_id,amount} =req.body;

    try {
        const data = await createWithdrawalReq(user_id,organization_id,amount);
        return res.status(200).json(new actionResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new actionResponse(500,error,false))
    }
}



export async function handleWithdrawalReqDelete(req,res) {
    const {user_id,id} =req.query;

    try {
        const data = await deleteWithdrawalReq(id,user_id);
        return res.status(200).json(new actionResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new actionResponse(500,error,false))
    }
}



export async function handleGetOrgWithdrawals(req,res){
    const {id} = req.params;
    try {
        const data = await getOrganizationWithdrawals(id);
        return res.status(200).json(new actionResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new actionResponse(500,error,false))
    }
}


export async function handleWithdrawalsUpdate(req,res) {
    const {id,status,remark} = req.body;
    try {
        const data = await updateWithdrawalReq(id,status,remark);
        return res.status(200).json(new actionResponse(200,data,true))
    } catch (error) {
        return res.status(500).json(new actionResponse(500,error,false))
    }
}