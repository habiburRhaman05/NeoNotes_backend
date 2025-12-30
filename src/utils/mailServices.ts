import { errorHandler } from "../middleware/errorHandler";
import { AppError } from "./AppError";
import { mailTransport } from "./mailTransporter";

export async function sendMail(data:{email:string,name:string,subject:string,body:string}) {
  try {
    const mailOptions = {
     from: `"red-blog" <your-actual-email@gmail.com>`,
      to: data.email,
      subject:data.subject,
      html: data.body,
    };

   const res = await mailTransport.sendMail(mailOptions);
    return res;
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to send mail", 400);
  }
}