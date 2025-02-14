import express from 'express';
import { getUser, handleAddAdmin, handleCreateUser, handleGetAdmin, handleGetAllAdmins, handleGetAllUsers, handleGetUserByOrg, handleGetUserDetails, handleUpdateUser, handleUserStatus,  } from '../controllers/users.js';
import { adminAuth, auth, superAdminAuth } from '../middlewares/auth.js';
import { ApiUserResponse } from '../helpers/Response.js';
import { generateToken } from '../auth/auth.js';


const router  = express.Router();

router.get('/',auth,handleGetAllUsers)


router.get('/org/:id',auth,adminAuth,handleGetUserByOrg)

router.get('/detail/:id',auth,adminAuth,handleGetUserDetails)

router.get('/admin',auth,superAdminAuth,handleGetAllAdmins)

router.get('/admin/:id',auth,superAdminAuth,handleGetAdmin);

router.get('/status',auth,adminAuth,handleUserStatus);


router.post('/update',auth,handleUpdateUser);

router.post('/register',auth,adminAuth,handleCreateUser);



export default router;

