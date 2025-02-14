import express from 'express';
import { handleGetAllOrganization, handleGetOrganization, handleNewRegister, handleOrganizationStatus, handleOrgUpdate } from '../controllers/organization.js';
import upload from '../services/multer.js';

const router  = express.Router();


router.get('/',handleGetAllOrganization)

router.get('/status',handleOrganizationStatus)

router.get('/:id',handleGetOrganization)

router.post('/register',upload.single('payment_url'),handleNewRegister)

router.post('/update',upload.single('payment_url'),handleOrgUpdate)


export default router;

