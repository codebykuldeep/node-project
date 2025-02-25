import { db } from "../db/initDb.js";

export async function updatePassword(user,password) {
    let result;
    const {email,role} = user;
    if(role === 'SUPER_ADMIN'){
        const id = user.super_id;
        result = await db.query('UPDATE super_admin SET password = $1 WHERE super_id = $2 AND LOWER(email) = $3 ;',[password,id,email]);
    }
    else if(role === 'ADMIN'){
        const id = user.admin_id;
        result = await db.query('UPDATE admin SET password = $1 WHERE  admin_id = $2 AND LOWER(email) = $3 ;',[password,id,email]);
    }
    else{
        const id = user.user_id;
        result = await db.query('UPDATE users SET password = $1 WHERE user_id = $2 AND LOWER(email) = $3 ;',[password,id,email]);
    }
    
    
    return result.rows;
}