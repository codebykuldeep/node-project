import { db } from "../db/initDb.js";

export async function getUserWithdrawals(id) {
    const res  = await db.query('SELECT * FROM transactions WHERE user_id = $1 AND payment_type = false ;',[id]);

    return res.rows;
}


export async function createWithdrawalReq(id,org_id,amount) {
    const res  = await db.query('INSERT INTO transactions(amount,organization_id,user_id ,payment_type) VALUES( $1 , $2 , $3 ,false);',[amount,org_id,id]);

    return res.rows;
}



export async function deleteWithdrawalReq(id,user_id) {
    const res = await db.query('DELETE FROM withdrawals WHERE id = $1 AND user_id = $2 ;',[id,user_id]);
    return res;
}


export async function getOrganizationWithdrawals(id) {
    const res = await db.query('SELECT * FROM transactions WHERE organization_id = $1  AND payment_type = false ;',[id]);
    return res.rows;
}


export async function updateWithdrawalReq(id,status,remark){
    const res = await db.query(`UPDATE withdrawals SET approved = $1 , remark = $2 WHERE id = $3 ;`,[status,remark,id])
    console.log(res);
    
    return res;
}