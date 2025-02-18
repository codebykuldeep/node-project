// Import the nodemailer module
import nodemailer from 'nodemailer';
import env from '../constants.js'

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: env.NODE_MAIL,
      pass: env.NODE_PASS,
    },
  });

  export async function sendSignUPMailForUser(email,password){
    const mailOptions = {
        from: env.NODE_MAIL,
        to: email,
        subject: "Hello From Groww More ",
        text: "This is a test email sent .",
        html:`<h1>Hello ,Welcome to Groww More</h1>
              <p>Email - ${email}</p>
              <p>Password - ${password}</p>
              `
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        return true;
    } catch (error) {
        return false;
    }
  }

