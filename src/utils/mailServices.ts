import { errorHandler } from "../middleware/errorHandler";
import { AppError } from "./AppError";
import { mailTransport } from "./mailTransporter";

export async function sendMail(data:{email:string,name:string,subject:string,body:string}) {
  try {
    const mailOptions = {
      from: `no-reply - www.google.com`,
      to: data.email,
      subject:data.subject,
      html: data.body,
    };

    await mailTransport.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(error);
    throw new AppError("Failed to send mail", 400);
  }
}