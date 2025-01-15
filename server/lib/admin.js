import {db} from '../db/initDb.js'

export async function getAllAdmin() {
    const res = await db.query(`SELECT admin.name AS admin ,* FROM admin INNER JOIN organization ON admin.organization_id = organization.id;`);
    return res.rows;
}

export async function addAdmin(name,email,password,number,organization_id) {
    const res = await db.query(`INSERT INTO admin (name, email, password,number ,organization_id) VALUES ( $1, $2, $3 , $4 , $5 ) RETURNING *;`,[name,email,password,number,organization_id]);
    
    return res.rows.length > 0 ? res.rows[0] : undefined ;
}



