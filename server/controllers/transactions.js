import { actionResponse } from "../helpers/Response.js";
import { createNewTransaction, getAllOrgTransactions, getUserTransactions, updateTransactionStatus } from "../lib/transactions.js";
import { uploadImage } from "../services/cloudinary.js";

export async function handleGetUserTransactions(req,res) {
    const {id} = req.params;
    const {type} =req.query;
    const action = type === 'credit'  ? true : type === 'debit' ? false : null ;

    try {
        const data = await getUserTransactions(id,action);
        return res.status(200).json(new actionResponse(200,data,true));
    } catch (error) {
        console.log(error);
        
        return res.status(500).json(new actionResponse(500,error,false))
    }
}

export async function handleGetOrgansitionTransactions(req,res) {
    const {id} = req.params;
    const {type} = req.query;
    let pending = type === 'pending' ? true : false;
    try {
        const data = await getAllOrgTransactions(id,pending);
        
        return res.status(200).json(new actionResponse(200,data,true));
    } catch (error) {
        return res.status(500).json(new actionResponse(200,error,false))
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
        return res.json(new actionResponse(200,error,false))
    }
}



export async function handleNewPayment(req,res){
    if(!req.file){
        return res.status(500).json(new actionResponse(500,error,false));
    }
    const {amount ,date} = req.body;
    const {user_id , organization_id} = req.user;
    
    
    try {
        const image = await uploadImage(req.file.path);
        const data = await createNewTransaction(amount,organization_id,user_id,image,date);
        return res.json(new actionResponse(200,'TRANSACTION SUCCESSFUL',true))
    } catch (error) {
        console.log(error);
        
        return res.json(new actionResponse(500,'TRANSACTION FAILED',false))
    }
}