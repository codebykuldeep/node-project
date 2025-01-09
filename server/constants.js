import env from 'dotenv';
env.config();


const constant ={
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
}


export default constant;