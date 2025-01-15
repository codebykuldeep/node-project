import express from 'express';
import { getUser, handleAddAdmin, handleCreateUser, handleGetAdmin, handleGetAllAdmins, handleGetAllUsers, handleGetUserByOrg, handleGetUserDetails, handleUpdateUser, handleUserStatus,  } from '../controllers/users.js';
import { adminAuth, auth, superAdminAuth } from '../middlewares/auth.js';
import { ApiUserResponse } from '../helpers/Response.js';
import { generateToken } from '../auth/auth.js';


const router  = express.Router();

router.get('/',auth,handleGetAllUsers)

router.get('/verify',auth,(req,res)=>{
   try {
    const user = req.user;
    delete user.password;
    const token = generateToken(user);
    return res.status(200).json(new ApiUserResponse(200,{user:req.user},token))
   } catch (error) {
    return res.status(401).json(new ApiUserResponse(401,{error}))
   }
})

router.post('/login',getUser)

router.get('/org/:id',auth,adminAuth,handleGetUserByOrg)

router.get('/detail/:id',auth,adminAuth,handleGetUserDetails)

router.get('/admin',auth,superAdminAuth,handleGetAllAdmins)

router.get('/admin/:id',auth,superAdminAuth,handleGetAdmin);

router.get('/status',auth,adminAuth,handleUserStatus);

router.post('/update',auth,handleUpdateUser);

router.post('/register',auth,adminAuth,handleCreateUser);


export default router;

