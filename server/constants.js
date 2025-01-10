import env from 'dotenv';
env.config();


const constant ={
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
    NODE_MAIL:process.env.NODE_MAIL,
    NODE_PASS:process.env.NODE_PASS
}


export default constant;