import express from 'express';
import { handleGetOrgansitionTransactions, handleUpdateTransactions } from '../controllers/transactions.js';

const router  = express.Router();

router.get('/org/update',handleUpdateTransactions);

router.get('/org/:id',handleGetOrgansitionTransactions);



export default router;

