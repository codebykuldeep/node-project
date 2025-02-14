import express from 'express';
import {adminAuth} from '../middlewares/auth.js'
import { handleGetOrgWithdrawals, handlegetUserWithdrawal, handleWithdrawalReq, handleWithdrawalsUpdate} from '../controllers/withdrawals.js'
const router  = express.Router();


router.post('/request',handleWithdrawalReq)

router.delete('/:id',handleWithdrawalReq)


router.get('/org/:id',adminAuth,handleGetOrgWithdrawals)

router.get('/:id',handlegetUserWithdrawal)


router.post('/update',handleWithdrawalsUpdate)



export default router;

