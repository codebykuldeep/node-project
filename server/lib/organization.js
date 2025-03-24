import {db} from '../db/initDb.js'

export async function addOrganization(name,description,payment_id,payment_url) {
    const res = await db.query(`INSERT INTO organization (name, description, payment_id,payment_url) VALUES ( $1, $2, $3 , $4) RETURNING *;`,[name,description,payment_id,payment_url]);
    
    return res.rows[0];
}


export async function getAllOrganization() {
    const res = await db.query(`SELECT * FROM  organization ;`);
    
    return res.rows;
}


export async function getOrganization(id) {
    const res = await db.query(`SELECT * FROM  organization WHERE organization_id = $1 ;`,[id]);
    return res.rows[0];
}


export async function switchOrganizationStatus(id,status) {
    const res = await db.query(`UPDATE organization SET status = $1 WHERE organization_id = $2 ;`,[status,id]);
    
    return res.rows;
}


export async function updateOrganization(id,name,description,payment_id,payment_url) {
    const res = await db.query('UPDATE organization SET name = $1 , description = $2 , payment_id = $3 , payment_url = $4 WHERE organization_id = $5 ;',[name,description,payment_id,payment_url,id]);
    console.log(res);

    return res
    
}


export async function searchOrganizations(query) {
    const res = await db.query('SELECT * FROM organization WHERE name LIKE $1 ;',['%'+query+'%'])
    return res.rows;
}

export async function getDetailOrganization(id){
    const res = await db.query(`SELECT 
(select SUM(amount)  from transactions WHERE organization_id = $1 AND approved IS NULL AND payment_type = true
) AS credit_pending ,
( select SUM(amount)  from transactions WHERE organization_id = $1 AND approved = true AND payment_type = true
) AS credit_approved ,
( select SUM(amount)  from transactions WHERE organization_id = $1 AND approved = false AND payment_type = true
) AS credit_rejected ,
(select SUM(amount)  from transactions WHERE organization_id = $1 AND approved IS NULL AND payment_type = false
) AS debit_pending ,
( select SUM(amount)  from transactions WHERE organization_id = $1 AND approved = true AND payment_type = false 
 ) AS debit_approved ,
 ( select SUM(amount) from transactions WHERE organization_id = $1 AND approved = false AND payment_type = false 
)  AS debit_rejected ,
( select COUNT(*)  from users WHERE organization_id = $1 AND status = false ) AS user_inactive ,
( select COUNT(*)  from users WHERE organization_id = $1 AND status = true ) AS user_active ,
 ( select COUNT(*)  from transactions WHERE organization_id = $1 AND payment_type = true ) AS transaction_credit ,
( select COUNT(*)  from transactions WHERE organization_id = $1 AND payment_type = false ) AS transaction_debit
;
`,[id])

const transactions_data = await db.query(`SELECT COUNT(*) , trans_date from  ( SELECT * ,to_char(created_at::TIMESTAMP, 'DD-MM-YYYY') AS trans_date
FROM transactions WHERE organization_id = $1 ) group by trans_date ;
` ,[id]);
    const data = {
        details :res.rows[0],
        transactions_data:transactions_data.rows
    }
    return data;
}