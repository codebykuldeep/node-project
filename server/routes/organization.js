import express from 'express';
import { handleGetAllOrganization, handleGetOrganization, handleNewRegister } from '../controllers/organization.js';

const router  = express.Router();


router.get('/',handleGetAllOrganization)

router.get('/:id',handleGetOrganization)

router.post('/register',handleNewRegister)


export default router;

