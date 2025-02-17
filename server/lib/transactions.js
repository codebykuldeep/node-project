import { db } from "../db/initDb.js";

export async function getAllOrgTransactions(id,pending) {
    let res;
    if(pending){
        res = await db.query(`SELECT * FROM
            (SELECT * , users.organization_id as org_id  , transactions.amount AS paid_amount FROM transactions INNER JOIN users ON transactions.user_id = users.user_id) as t 
           WHERE t.org_id = $1 AND  t.approved IS NULL ;`,[id]);
    }
    else{
        res = await db.query(`SELECT * FROM
            (SELECT * , users.organization_id as org_id  , transactions.amount AS paid_amount FROM transactions INNER JOIN users ON transactions.user_id = users.user_id) as t 
           WHERE t.org_id = $1 ;`,[id]);
    }
     
    return res.rows;
}

export async function createNewTransaction(amount,organization_id,user_id,image,date) {
    const res = await db.query('INSERT INTO transactions(amount,organization_id,user_id,image_url,created_at) VALUES( $1 ,$2 ,$3 ,$4 , $5);',[amount,organization_id,user_id,image,date]);
    return res;
}




export async function updateTransactionStatus(transaction_id,status) {
    const res = await db.query(`UPDATE transactions SET approved = $1 WHERE transaction_id = $2 ;`,[status,transaction_id])
    console.log(res);
    
    return res;
}

export async function getUserTransactions(id) {
    const res = await db.query(`SELECT * FROM transactions WHERE user_id = $1 ;`,[id]);
     
    return res.rows;
}