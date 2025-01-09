import {db} from '../db/initDb.js'

export async function addAdmin(name,email,password,number,organization_id) {
    const res = await db.query(`INSERT INTO admin (name, email, password,number ,organization_id) VALUES ( $1, $2, $3 , $4 , $5 ) RETURNING *;`,[name,email,password,number,organization_id]);
    console.log(res);
    
}



