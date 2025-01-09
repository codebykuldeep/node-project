import {db} from '../db/initDb.js'

export async function addOrganization(name,email,password,number) {
    const res = await db.query(`INSERT INTO super_admin (name, email, password,number) VALUES ( $1, $2, $3 , $4) RETURNING *;`,[name,email,password,number]);
    console.log(res);
    
}