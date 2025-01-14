import { actionResponse } from "../helpers/Response.js";
import { getAllOrgTransactions, getUserTransactions, updateTransactionStatus } from "../lib/transactions.js";

export async function handleGetUserTransactions(req,res) {
    const {id} = req.params;
    try {
        const data = await getUserTransactions(id);
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,{error},false))
    }
}

export async function handleGetOrgansitionTransactions(req,res) {
    const {id} = req.params;
    const {type} = req.query;
    let pending = type === 'pending' ? true : false;
    try {
        const data = await getAllOrgTransactions(id,pending);
        
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,{error},false))
    }
}

export async function handleUpdateTransactions(req,res) {
    const {transaction_id,status} = req.query;
   console.log(transaction_id,status);
   console.log('here');
   
   
    try {
        const data = await updateTransactionStatus(transaction_id,status);
        return res.json(new actionResponse(200,data,true));
    } catch (error) {
        return res.json(new actionResponse(200,{error},false))
    }
}