import { betterAuth, string } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma as prismaClient } from "./prisma";
import { sendMail } from "../utils/mailServices";
// If your Prisma file is located elsewhere, you can change the path


const prisma = prismaClient;
export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword:{
enabled:true,
autoSignIn:false,
requireEmailVerification:true
    },
    user:{
additionalFields:{
    role:{
        type:"string",
        defaultValue:"USER",
        required:true
    },
    status:{
            type:"string",
        defaultValue:"ACTIVE",
        required:false
    },
    phone:{
            type:"string",
    
        required:false
    }
}
    },
    emailVerification:{

        sendVerificationEmail: async ( { user, url, token }, request) => {
    
            await sendMail({
                email:user.email,
                name:user.name,
                subject: "verify email",
                body:`this verifiction email  token = ${token}`
            })
     
    },

    },
    
    socialProviders:{
        google:{
            clientId:"",
            clientKey:"",
            clientSecret:""
        }
    }
});