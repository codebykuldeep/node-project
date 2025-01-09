import express from 'express';
import { addUser, getUser } from '../controllers/users.js';


const router  = express.Router();



router.get('/',getUser)

router.post('/',addUser)


export default router;

