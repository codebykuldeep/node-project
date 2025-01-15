import express from 'express';
import { getUser, handleAddAdmin, handleGetAdmin, handleGetAllAdmins, handleGetAllUsers, handleGetUserByOrg, handleGetUserDetails, handleUserStatus,  } from '../controllers/users.js';
import { adminAuth, auth, superAdminAuth } from '../middlewares/auth.js';
import { handleAdminRegister } from '../controllers/admin.js';


const router  = express.Router();

router.get('/search',adminAuth,handleAdminRegister)

router.post('/register',superAdminAuth,handleAdminRegister)


export default router;

