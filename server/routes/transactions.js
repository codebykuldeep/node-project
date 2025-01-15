import express from 'express';
import { handleGetOrgansitionTransactions, handleGetUserTransactions, handleUpdateTransactions } from '../controllers/transactions.js';

const router  = express.Router();



router.get('/org/update',handleUpdateTransactions);

router.get('/org/:id',handleGetOrgansitionTransactions);

router.get('/:id',handleGetUserTransactions);



export default router;

