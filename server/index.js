import express from 'express';
import path from 'node:path'
import cors from 'cors';
import env from './constants.js'
import {connectDb} from './db/initDb.js';
import morgan from 'morgan';
import favicon from 'serve-favicon'
//MIDDLEWARES
import { logger } from './middlewares/helperMiddlewares.js';
import { auth } from './middlewares/auth.js';


//ROUTES IMPORT
import commonRouter from './routes/common.js';
import userRouter from './routes/users.js'
import organizationRouter from './routes/organization.js';
import transactionRouter from './routes/transactions.js'
import AdminRouter from './routes/admin.js'
import withdrawalRouter from './routes/withdrawals.js';



const app = express();


const options= {
    origin:'*',
    methods:['GET', 'PUT', 'POST','DELETE'],
    exposedHeaders:['Authorization']
}

// app.use(logger);
app.use(favicon(path.resolve('public','favicon.ico')))
app.use(morgan('dev'));
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/',commonRouter)
app.use('/user',userRouter);
app.use('/admin',auth,AdminRouter);
app.use('/organization',auth,organizationRouter);
app.use('/transactions',auth,transactionRouter);
app.use('/withdrawals',auth,withdrawalRouter)

app.get('/',(req,res)=>{
    res.send('Server is running')
})


connectDb().then(()=>{
    app.listen(env.PORT,()=>{
        console.log(`Server is running at ${env.PORT}`);
        
    })
})
