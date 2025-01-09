import {db} from '../db/initDb.js'

async function addUsers(name,email,password,number) {
    const res = await db.query(`INSERT INTO users (name, email, password,number) VALUES ( $1, $2, $3 , $4) RETURNING *;`,[name,email,password,number]);
    console.log(res);
    
}