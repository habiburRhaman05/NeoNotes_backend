import express, { type Express, type Request, type Response } from 'express';
import { connectToDatabase } from './config/db';
import { applyMiddleware } from './middleware';
import { envConfig } from './config/env';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import postRouter from './modules/post/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import userRouter from './modules/user/user.router';


const app: Express = express();
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json({ limit: '1mb' }));

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)
// wel come
app.get("/welcome",(req,res)=>{
  res.send("welcome")
})
// after clicking verification link
app.get("/success-verification",(req,res)=>{
  res.send("success-verification")
})

// for otp email verify
app.post("/api/verify-otp", async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
    }

    try {
        // We use the Better Auth API internal method to verify
        const result = await auth.api.verifyEmailOTP({
            body: {
                email: email,
                otp: otp,
            }
        });

        return res.json({ 
            message: "Email verified successfully!",
            result 
        });
    } catch (error: any) {
        // Better Auth throws errors for expired or incorrect OTPs
        return res.status(400).json({ 
            message: error.message || "Invalid or expired OTP" 
        });
    }
});
export const startServer = async () => {
  try {

    applyMiddleware(app);

    const PORT = envConfig.PORT || 5000;
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server is running on port ${PORT}`);
    });


  } catch (error) {
    console.error('❌ Error initializing app:', error);
    process.exit(1);
  }
};
app.use(notFound);
app.use(errorHandler);


export default app;
