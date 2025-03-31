import {db} from '../db/initDb.js'

export async function getAllUsers() {
    //const res= await db.query('SELECT users.name AS user,user.status AS status, organization.status AS org_status , * FROM users INNER JOIN organization ON users.organization_id = organization.id ;');
    const res  = await db.query('SELECT * FROM users ; ')
    return res.rows;
}


export async function addUsers(name,email,password,number,interest,id) {
    const res = await db.query(`INSERT INTO users (name, email, password,number,interest,organization_id) VALUES( $1, $2, $3 , $4, $5,$6) RETURNING *;`,[name,email,password,number,interest,id]);
    console.log(res);
    return res;
}


export async function  searchForUser(email) {
    //first check for normal user
    const userResult  = await db.query('SELECT * FROM users WHERE LOWER(email) = $1 ;',[email]);
    if(userResult.rows.length > 0){
        const user = userResult.rows[0];
        user.role ="USER";
        return user;
    }

    //second check for admin user
    const adminResult  = await db.query('SELECT * FROM admin WHERE LOWER(email) = $1 ;',[email]);
    if(adminResult.rows.length > 0){
        const user = adminResult.rows[0];
        user.role ="ADMIN";
        return user;
    }

    //third check for super admin user
    const superAdminResult  = await db.query('SELECT * FROM super_admin WHERE LOWER(email) = $1 ;',[email]);
    if(superAdminResult.rows.length > 0){
        const user = superAdminResult.rows[0];
        user.role ="SUPER_ADMIN";
        return user;
    }

    throw new Error('user not exists')

}
export async function getUser(user) {
    let result;
    const {email,role} = user;
    if(role === 'SUPER_ADMIN'){
        const id = user.super_id;
        result = await db.query('SELECT * FROM super_admin WHERE super_id = $1 AND LOWER(email) = $2 ;',[id,email]);
    }
    else if(role === 'ADMIN'){
        const id = user.admin_id;
        result = await db.query('SELECT * FROM admin WHERE admin_id = $1 AND LOWER(email) = $2 ;',[id,email]);
    }
    else{
        const id = user.user_id;
        result = await db.query('SELECT * FROM users WHERE user_id = $1 AND LOWER(email) = $2 ;',[id,email]);
    }
    
    
    if(result.rows.length > 0){
        const user  = result.rows[0];
        user.role = role;
        return user;
    }
    return undefined;
}



export async function updateUser(user,email,name,number,role) {
    let result;
    if(role === 'SUPER_ADMIN'){
        const id = user.super_id;
        result = await db.query('UPDATE super_admin SET email = $1 , name = $2 , number = $3 WHERE super_id = $4 ;',[email,name,number,id]);
    }
    else if(role === 'ADMIN'){
        const id = user.admin_id;
        
        result = await db.query('UPDATE admin SET email = $1 , name = $2 , number = $3 WHERE admin_id = $4 ;',[email,name,number,id]);
    }
    else{
        const id = user.user_id;
        result = await db.query('UPDATE users SET email = $1 , name = $2 , number = $3 WHERE user_id = $4 ;',[email,name,number,id]);
    }
    console.log(result);
    
    return result.rows;
}


export async function getSpecificUser(id){
    const res = await db.query(`SELECT * FROM users where user_id = $1 ;`,[id]);

    return res.rows[0];
}


export async function getUserByOrganization(id) {
    const res = await db.query(`SELECT * FROM  users WHERE organization_id = $1 ;`,[id]);
    
    return res.rows.length > 0 ? res.rows : undefined;
}


export async function switchUserStatus(id,status,role) {
    let res;
    if(role === 'ADMIN'){
        res = await db.query(`UPDATE admin SET status = $1 WHERE admin_id = $2 ;`,[status,id]);

    }
    else{
        console.log('user');
        
        res = await db.query(`UPDATE users SET status = $1 WHERE user_id = $2 ;`,[status,id]);
    }
    return res.rows;
}

export async function searchUsers(query) {
    const res = await db.query('SELECT * FROM users WHERE name LIKE $1 ;',['%'+query+'%'])
    return res.rows;
}



//ADMIN QUERIES
export async function getAdmin(id) {
    const res = await db.query(`SELECT * FROM admin where admin_id = $1 ;`,[id]);
    return res.rows.length > 0 ? res.rows[0] : undefined;
}


export async function getUsersDetails(user_id, organization_id) {
  const user_res = await db.query(`SELECT * FROM users where user_id = $1 ;`, [user_id]);

  const data_res = await db.query(
    `SELECT 
(select SUM(amount)  from transactions WHERE organization_id = $1 AND user_id = $2 AND approved IS NULL AND payment_type = true
) AS credit_pending ,
( select SUM(amount)  from transactions WHERE organization_id = $1 AND user_id = $2 AND  approved = true AND payment_type = true
) AS credit_approved ,
( select SUM(amount)  from transactions WHERE organization_id = $1 AND user_id = $2 AND  approved = false AND payment_type = true
) AS credit_rejected ,
(select SUM(amount)  from transactions WHERE organization_id = $1 AND user_id = $2 AND  approved IS NULL AND payment_type = false
) AS debit_pending ,
( select SUM(amount)  from transactions WHERE organization_id = $1 AND user_id = $2 AND  approved = true AND payment_type = false 
 ) AS debit_approved ,
 ( select SUM(amount) from transactions WHERE organization_id = $1 AND user_id = $2 AND  approved = false AND payment_type = false 
)  AS debit_rejected ,
( select COUNT(*)  from transactions WHERE organization_id = $1 AND user_id = $2 AND  payment_type = true ) AS transaction_credit ,
( select COUNT(*)  from transactions WHERE organization_id = $1 AND user_id = $2 AND  payment_type = false ) AS transaction_debit
`,
    [organization_id,user_id]
  );

  const data ={
    user:user_res.rows[0],
    data:data_res.rows[0]
  }
  return data;
}