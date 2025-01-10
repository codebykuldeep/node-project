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

  




  async function sendSignUPMail(email){
    const mailOptions = {
        from: env.NODE_MAIL,
        to: env.NODE_MAIL,
        subject: "Hello ",
        text: "This is a test email sent .",
        html:'<h1>Hello I am sending a mail from server .</h1>'
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        return true;
    } catch (error) {
        return false;
    }
  }

