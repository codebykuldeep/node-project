import {db} from '../db/initDb.js'

export async function addOrganization(name,description,payment_id,payment_url) {
    const res = await db.query(`INSERT INTO organization (name, description, payment_id,payment_url) VALUES ( $1, $2, $3 , $4) RETURNING *;`,[name,description,payment_id,payment_url]);
    
    return res.rows[0];
}


export async function getAllOrganization() {
    const res = await db.query(`SELECT * FROM  organization ;`);
    
    return res.rows;
}