import express from 'express';
import { handleGetOrgansitionTransactions, handleGetUserTransactions, handleNewPayment, handleUpdateTransactions } from '../controllers/transactions.js';
import upload from '../services/multer.js';

const router  = express.Router();



router.get('/org/update',handleUpdateTransactions);

router.get('/org/:id',handleGetOrgansitionTransactions);

router.get('/:id',handleGetUserTransactions);

router.post('/new',upload.single('image'),handleNewPayment)



export default router;

