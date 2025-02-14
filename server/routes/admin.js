import express from 'express';
import { getUser, handleAddAdmin, handleGetAdmin, handleGetAllAdmins, handleGetAllUsers, handleGetUserByOrg, handleGetUserDetails, handleUserStatus,  } from '../controllers/users.js';
import { adminAuth, auth, superAdminAuth } from '../middlewares/auth.js';
import { handleAdminRegister, handleSearch } from '../controllers/admin.js';


const router  = express.Router();

router.get('/search',adminAuth,handleSearch)

router.post('/register',superAdminAuth,handleAdminRegister)


export default router;

