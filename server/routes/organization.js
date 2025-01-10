import express from 'express';
import { handleGetAllOrganization, handleNewRegister } from '../controllers/organization.js';

const router  = express.Router();


router.get('/',handleGetAllOrganization)

router.post('/register',handleNewRegister)


export default router;

