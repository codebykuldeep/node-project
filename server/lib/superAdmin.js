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