// Import the nodemailer module
import nodemailer from 'nodemailer';
import env from '../constants.js'
import { generateResetLink } from './resetPassword.js';

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


  export async function sendForgetPasswordMail(email,user){
    const mailOptions = {
        from: env.NODE_MAIL,
        to: email,
        subject: "Reset Password - Groww More ",
        text: "This is a test email sent .",
        html:resetPasswordTemplate(generateResetLink(email),user.name)
    };
    try {
        const info = await transporter.sendMail(mailOptions)
        return true;
    } catch (error) {
        return false;
    }
  }



  const resetPasswordTemplate = (resetLink, userName) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Password</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f9;
              margin: 0;
              padding: 0;
              color: #333;
          }
          .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 10px;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              text-align: center;
          }
          h2 {
              color: #f27457;
          }
          p {
              line-height: 1.6;
          }
          .reset-button {
              display: inline-block;
              padding: 12px 20px;
              background-color: #f27457;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              margin-top: 20px;
              font-weight: bold;
          }
          .reset-button:hover {
              background-color: #f27457;
          }
          footer {
              margin-top: 20px;
              font-size: 12px;
              color: #666;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <h2>Password Reset Request</h2>
          <p>Hi ${userName},</p>
          <p>We received a request to reset your password. If this was not you, please ignore this email.</p>
          <p>To reset your password, please click the button below:</p>
          <a href="${resetLink}" class="reset-button">Reset Password</a>
         
      </div>
  </body>
  </html>
  `;
  
  

