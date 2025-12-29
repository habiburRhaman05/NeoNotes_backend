import express, { type Express, type Request, type Response } from 'express';
import { connectToDatabase } from './config/db';
import { applyMiddleware } from './middleware';
import { envConfig } from './config/env';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';
import postRouter from './modules/posts/post.router';
import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';
import userRouter from './modules/users/user.router';


const app: Express = express();
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json({ limit: '1mb' }));

app.use("/api/v1/posts",postRouter)
app.use("/api/v1/users",userRouter)


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
