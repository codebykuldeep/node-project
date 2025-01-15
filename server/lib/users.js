import {db} from '../db/initDb.js'

export async function getAllUsers() {
    const res= await db.query('SELECT users.name AS user , * FROM users INNER JOIN organization ON users.organization_id = organization.id ;');
    return res.rows;
}


export async function addUsers(name,email,password,number) {
    const res = await db.query(`INSERT INTO users (name, email, password,number) VALUES ( $1, $2, $3 , $4) RETURNING *;`,[name,email,password,number]);
    console.log(res);
    
}


export async function  searchForUser(email) {
    //first check for normal user
    const userResult  = await db.query('SELECT * FROM users WHERE LOWER(email) = $1 ;',[email]);
    if(userResult.rows.length > 0){
        const user = userResult.rows[0];
        user.role ="USER";
        return user;
    }

    //second check for normal user
    const adminResult  = await db.query('SELECT * FROM admin WHERE LOWER(email) = $1 ;',[email]);
    if(adminResult.rows.length > 0){
        const user = adminResult.rows[0];
        user.role ="ADMIN";
        return user;
    }

    //second check for normal user
    const superAdminResult  = await db.query('SELECT * FROM super_admin WHERE LOWER(email) = $1 ;',[email]);
    if(superAdminResult.rows.length > 0){
        const user = superAdminResult.rows[0];
        user.role ="SUPER_ADMIN";
        return user;
    }

    throw new Error('user not exists')

}



export async function getUser(id,email,role) {
    let result;
    if(role === 'SUPER_ADMIN'){
        result = await db.query('SELECT * FROM super_admin WHERE id = $1 AND LOWER(email) = $2 ;',[id,email]);
    }
    else if(role === 'ADMIN'){
        result = await db.query('SELECT * FROM admin WHERE id = $1 AND LOWER(email) = $2 ;',[id,email]);
    }
    else{
        result = await db.query('SELECT * FROM users WHERE id = $1 AND LOWER(email) = $2 ;',[id,email]);
    }
    
    
    if(result.rows.length > 0){
        const user  = result.rows[0];
        user.role = role;
        
        return user;
    }
    return undefined;
}


export async function getUserByOrganization(id) {
    const res = await db.query(`SELECT * FROM  users WHERE organization_id = $1 ;`,[id]);
    
    return res.rows.length > 0 ? res.rows : undefined;
}



//ADMIN QUERIES
export async function getAdmin(id) {
    const res = await db.query(`SELECT * FROM admin where id = $1 ;`,[id]);
    return res.rows.length > 0 ? res.rows[0] : undefined;
}