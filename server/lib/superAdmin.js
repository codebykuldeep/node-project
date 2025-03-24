import {db} from '../db/initDb.js'

async function addSuperAdmin(name,email,password,number) {
    const res = await db.query(`INSERT INTO super_admin (name, email, password,number) VALUES ( $1, $2, $3 , $4) RETURNING *;`,[name,email,password,number]);
    console.log(res);
    
}

export async function getSuperAdmin(email) {
    email = email.toLowerCase()
    const {rows} =  await db.query(`SELECT * FROM super_admin WHERE LOWER(email) = $1 ;`,[email])
    
    return rows.length > 0 ? rows[0] : undefined;
}


export async function getSuperAdminHomeDetails() {
    const res = await db.query(`SELECT 
(select SUM(amount)  from transactions WHERE  approved IS NULL AND payment_type = true
) AS credit_pending ,
( select SUM(amount)  from transactions WHERE  approved = true AND payment_type = true
) AS credit_approved ,
( select SUM(amount)  from transactions WHERE  approved = false AND payment_type = true
) AS credit_rejected ,
(select SUM(amount)  from transactions WHERE  approved IS NULL AND payment_type = false
) AS debit_pending ,
( select SUM(amount)  from transactions WHERE  approved = true AND payment_type = false 
 ) AS debit_approved ,
 ( select SUM(amount) from transactions WHERE  approved = false AND payment_type = false 
)  AS debit_rejected ,
( select COUNT(*)  from users WHERE  status = false ) AS user_inactive ,
( select COUNT(*)  from users WHERE  status = true ) AS user_active ,
( select COUNT(*)  from organization WHERE  status = false ) AS org_inactive ,
( select COUNT(*)  from organization WHERE  status = true ) AS org_active ,
( select COUNT(*)  from transactions WHERE  payment_type = true ) AS transaction_credit ,
( select COUNT(*)  from transactions WHERE  payment_type = false ) AS transaction_debit ;
`)
return res.rows[0];
}