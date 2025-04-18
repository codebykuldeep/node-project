import {db} from '../db/initDb.js'

export async function getAllAdmin() {
    const res = await db.query(`SELECT admin.name AS admin_name , organization.name AS org_name, organization.status AS org_status, admin.status AS admin_status ,* FROM admin INNER JOIN organization ON admin.organization_id = organization.organization_id;`);
    return res.rows;
}

export async function addAdmin(name,email,password,number,organization_id) {
    const res = await db.query(`INSERT INTO admin (name, email, password,number ,organization_id) VALUES ( $1, $2, $3 , $4 , $5 ) RETURNING *;`,[name,email,password,number,organization_id]);
    
    return res.rows.length > 0 ? res.rows[0] : undefined ;
}


export async function searchAdmin(query) {
    const res = await db.query('SELECT * FROM admin WHERE name LIKE $1 ;',['%'+query+'%'])
    return res.rows;
}



