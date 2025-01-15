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
    const res = await db.query(`SELECT * FROM  organization WHERE id = $1 ;`,[id]);
    
    
    return res.rows.length > 0 ? res.rows[0] : undefined;
}


export async function switchOrganizationStatus(id,status) {
    const res = await db.query(`UPDATE organization SET status = $1 WHERE id = $2 ;`,[status,id]);
    
    return res.rows;
}


export async function updateOrganization(id,name,description,payment_id,payment_url) {
    const res = await db.query('UPDATE organization SET name = $1 , description = $2 , payment_id = $3 , payment_url = $4 WHERE id = $5 ;',[name,description,payment_id,payment_url,id]);
    console.log(res);

    return res
    
}


export async function searchOrganizations(query) {
    const res = await db.query('SELECT * FROM organization WHERE name LIKE %$1% OR description LIKE %$2% ;',[query,query])
    return res.rows;
}