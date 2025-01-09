import express from 'express';
import cors from 'cors';
import env from './constants.js'
import {connectDb} from './db/initDb.js';
//ROUTES IMPORT
import userRouter from './routes/users.js'



const app = express();

// db.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     // db.query('INSERT INTO users values($1,$2);',[2,'max']).then(res=>{console.log(res);})
//   });


const options= {
    origin:'*',
    methods:['GET', 'PUT', 'POST','DELETE'],
    exposedHeaders:['token']
}

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/user',userRouter);

app.get('/',(req,res)=>{
    res.send('hello')
})


connectDb().then(()=>{
    app.listen(env.PORT,()=>{
        console.log(`Server is running at ${env.PORT}`);
        
    })
})