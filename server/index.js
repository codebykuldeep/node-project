import express from 'express';
import cors from 'cors';
import env from './constants.js'
import {connectDb} from './db/initDb.js';


//ROUTES IMPORT
import userRouter from './routes/users.js'
import organizationRouter from './routes/organization.js';
import transactionRouter from './routes/transactions.js'
import { logger } from './middlewares/helperMiddlewares.js';
import { auth } from './middlewares/auth.js';



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

app.use('/user',userRouter);
app.use('/organization',auth,organizationRouter);
app.use('/transactions',auth,transactionRouter);

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