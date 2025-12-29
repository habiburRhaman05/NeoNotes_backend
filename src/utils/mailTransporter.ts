
import nodemailer from "nodemailer"


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:process.env.USER_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD // App Password
  },
});


transporter.verify(function(error, success) {
  if (error) {
    console.error('SMTP Connection Error:', error);
  } else {
    console.log('Server is ready to send emails');
  }
});

export const mailTransport = transporter

