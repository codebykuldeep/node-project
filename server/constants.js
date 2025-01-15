import env from 'dotenv';
env.config();


const constant ={
    PORT:process.env.PORT,
    SECRET:process.env.SECRET,
    NODE_MAIL:process.env.NODE_MAIL,
    NODE_PASS:process.env.NODE_PASS,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUD_KEY:process.env.CLOUD_KEY,
    CLOUD_SECRET:process.env.CLOUD_SECRET,
}


export default constant;