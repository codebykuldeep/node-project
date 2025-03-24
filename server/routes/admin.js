import express from 'express';
import { getUser, handleAddAdmin, handleGetAdmin, handleGetAllAdmins, handleGetAllUsers, handleGetUserByOrg, handleGetUserDetails, handleUserStatus,  } from '../controllers/users.js';
import { adminAuth, auth, superAdminAuth } from '../middlewares/auth.js';
import { handleAdminRegister, handleGetUserDetailsForProfile, handleSearch, handleSuperAdminHome } from '../controllers/admin.js';


const router  = express.Router();

router.get('/',auth,superAdminAuth,handleGetAllAdmins)



router.get('/search',adminAuth,handleSearch)


router.get('/user-detail',handleGetUserDetailsForProfile)

router.get('/super-admin-home',superAdminAuth,handleSuperAdminHome)

router.post('/register',superAdminAuth,handleAdminRegister)

router.get('/:id',auth,superAdminAuth,handleGetAdmin);


export default router;

