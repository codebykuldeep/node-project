import { db } from "../db/initDb.js";

export async function getAllOrgTransactions(id,pending) {
    let res;
    if(pending){
        res = await db.query(`SELECT * FROM
            (SELECT * FROM transactions INNER JOIN users ON transactions.user_id = users.id) as t 
          WHERE T.user_id = $1 AND t.approved is NULL;`,[id]);
    }
    else{
        res = await db.query(`SELECT * FROM
            (SELECT * , users.organization_id as org_id FROM transactions INNER JOIN users ON transactions.user_id = users.id) as t 
           WHERE org_id = $1 ;`,[id]);
    }
     
    return res.rows;
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