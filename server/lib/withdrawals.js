import { db } from "../db/initDb.js";

export async function getUserWithdrawals(id) {
    const res  = await db.query('SELECT * FROM withdrawals WHERE user_id = $1 ;',[id]);

    return res.rows;
}


export async function createWithdrawalReq(id,org_id,amount) {
    const res  = await db.query('INSERT INTO withdrawals(amount,organization_id,user_id) VALUES( $1 , $2 , $3 );',[amount,org_id,id]);

    return res.rows;
}



export async function deleteWithdrawalReq(id,user_id) {
    const res = await db.query('DELETE FROM withdrawals WHERE id = $1 AND user_id = $2 ;',[id,user_id]);
    return res;
}


export async function getOrganizationWithdrawals(id) {
    const res = await db.query('SELECT * FROM withdrawals WHERE organization_id = $1 ;',[id]);
    return res.rows;
}


export async function updateWithdrawalReq(id,status,remark){
    const res = await db.query(`UPDATE withdrawals SET approved = $1 , remark = $2 WHERE id = $3 ;`,[status,remark,id])
    console.log(res);
    
    return res;
}