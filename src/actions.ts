"use server";

import { sessionOptions, SessionData, defaultSession } from "@/lib";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import prisma from "../prisma";
import { redirect

 } from "next/navigation";
var bcrypt = require("bcryptjs");

export const getSession = async () => {
  const session = await getIronSession<SessionData>(
    await cookies(),
    sessionOptions
  );

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};

export const login = async (formData: FormData) => {
  const session = await getSession();

  const formEmail = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: {
      email: formEmail,
    },
  });
  if (user) {

    var isPasswordCorrect = await bcrypt.compareSync(
      formPassword,
      user.password   
    );
    if (!isPasswordCorrect) {
       return {wrongPassword: true, message: "Le mot de passe est incorrect"}
    }
    else{
      session.userId = user.id
      session.userPseudonyme = user.pseudonyme;
      session.isLoggedIn = true;
      
      await session.save();
      redirect('/mon-univers')
      return {goodAuth: true, message: "connecté"}
    }
    
    return;
  } else if (!user){
    console.log("utilisateurn n'existe pas");
    return {wrongUser: true, message: "L'utilisateur n'existe pas, veuillez vous inscrire ou entrer un utilisateur valide"}
  }
};

export const logout = async () => {
  const session = await getSession();
  await session.destroy()
  redirect("/")
};

export const getUser = async () => {
  const session = await getSession();
  if (session.isLoggedIn){
    const user = await prisma.user.findUnique({
      where:{
        id: session.userId
      }
    })
    return user;
  }
  return "error"
}
export const getUserId = async() => {
  const session = await getSession();
  return session.userId;
}

export const getUserPosts = async () => {
   const session = await getSession();
    if (session.isLoggedIn){
        const user = await prisma.user.findUnique({
        where: {
            id: session.userId,
        },
       
        })
        if (user){
            const posts = await prisma.post.findMany({
              orderBy: {
                createdAt: 'desc'
              },
              where: {
                userId: session.userId,
              }
            })
            return posts
        }
    }
    return null
}
