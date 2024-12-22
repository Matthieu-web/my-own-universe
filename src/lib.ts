import { SessionOptions } from "iron-session"

export interface SessionData{
    userId?:number;
    userPseudonyme?:string;
    isLoggedIn:boolean
}

export const defaultSession: SessionData = {
    isLoggedIn:false
}
export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: "session",
    cookieOptions: {
        httpOnly: true,
        secure: process.env.Node_Env === "production"
    }
}