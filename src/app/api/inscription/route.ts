import prisma from "../../../../prisma";
import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers'
var bcrypt = require('bcryptjs');
export async function POST(req: NextRequest, res: NextResponse){
    
    const data = await req.json();
    const cookieStore = await cookies();

    const userByEmail = await prisma.user.findUnique({
        where: {
            email: data.email,
        }
    });
    
    if (userByEmail){
        return NextResponse.json({message: "adresse mail déjà enregistrée.", error: "mailAlreadySet"} , { status: 409} )
    }

    const userByPseudonyme = await prisma.user.findUnique({
        where: {
            pseudonyme: data.pseudonyme,
        }
    })
    if (userByPseudonyme){
             return NextResponse.json({message: "Ce pseudonyme est déjà utilisé.", error: "pseudonymeAlreadySet"} , { status: 409} )  
    }
    
    //si pas l'user est nouveau on l'enregistre dans la base de donnée
    if (data.lastname === "")
        data.lastname = null;
    if (data.firstname === "")
        data.firstname = null;
    
    data.password = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.create({
        
        data: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            pseudonyme: data.pseudonyme,
            password: data.password,
        }
    })
    return NextResponse.json({message: "user bien enregistré", error: false}, {status: 200})
}