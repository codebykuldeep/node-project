import express from 'express';
import cors from 'cors';
import env from './constants.js'
import {connectDb} from './db/initDb.js';


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

app.use(logger);
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',commonRouter)
app.use('/user',userRouter);
app.use('/admin',auth,AdminRouter);
app.use('/organization',auth,organizationRouter);
app.use('/transactions',auth,transactionRouter);
app.use('/withdrawals',auth,withdrawalRouter)

app.get('/',(req,res)=>{
    res.send('hello')
})


connectDb().then(()=>{
    app.listen(env.PORT,()=>{
        console.log(`Server is running at ${env.PORT}`);
        
    })
})










// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // db.query('INSERT INTO users values($1,$2);',[2,'max']).then(res=>{console.log(res);})
//   });