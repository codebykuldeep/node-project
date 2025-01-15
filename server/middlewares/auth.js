import { verifyUser } from "../auth/auth.js";
import { getUser } from "../lib/users.js";

export async function auth(req,res,next){
    
    if(!req.headers["authorization"]){
        return res.status(401).send({status:401,message:'provide valid authorization to access.',success:false})
    }
    const token  = req.headers["authorization"].split(' ')[1];
   
    
    try {
        const userData  = verifyUser(token);
        const {id , email ,role} = userData;
        const user = await getUser(id,email,role);
        req.user = user;
    } catch (error) {
        return res.status(401).send({status:401,message:'Unauthorized access',success:false})
    }
    next();
}


export function superAdminAuth(req,res,next){
    if(req.user.role !== 'SUPER_ADMIN'){
        return res.status(401).send({status:401,message:'Unauthorized access, only super admin are allowed',success:false})
    }
    next();
}

export function adminAuth(req,res,next){
    console.log(req.user);
    
    if(!req.user.role.includes('ADMIN')){
        return res.status(401).send({status:401,message:'Unauthorized access, only admin and super admins are allowed',success:false})
    }
    next();
}
