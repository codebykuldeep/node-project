import express from 'express';
import { generateToken } from '../auth/auth.js';
import { getUser } from '../controllers/users.js';
import { auth } from '../middlewares/auth.js';
import { ApiUserResponse } from '../helpers/Response.js';


const router  = express.Router();

router.get('/verify',auth,(req,res)=>{
    console.log(req.user);
    
   try {
    const user = req.user;
    delete user.password;
    const token = generateToken(user);
    return res.status(200).json(new ApiUserResponse(200,user,token,true))
   } catch (error) {
    return res.status(401).json(new ApiUserResponse(401,error,undefined,false))
   }
})

router.post('/login',getUser)


export default router;

