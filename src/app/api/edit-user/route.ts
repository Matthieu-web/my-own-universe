import { getSession } from "@/actions";
import prisma from "../../../../prisma";
import { NextResponse, NextRequest } from "next/server";

var bcrypt = require('bcryptjs');

export async function GET (req: NextRequest, res: NextResponse){
    const session = await getSession();

    if (session.isLoggedIn){
        const user = await prisma.user.findUnique({
            where:{
                id: session.userId,
            }
        })
        if (user){
            return NextResponse.json({email: user.email, firstname: user.firstname, lastname: user.lastname, pseudonyme: user.pseudonyme }, {status: 200});
        }
            
    }
    return NextResponse.json({message: "on devrait jamais être ici"}, {status: 409})
}

export async function POST(req: NextRequest, res: NextResponse){
    
    const data = await req.json();

    const userByPseudonyme = await prisma.user.findUnique({
        where: {
            pseudonyme: data.pseudonyme,
        }
    })
    if (userByPseudonyme && userByPseudonyme.email != data.email){
        return NextResponse.json({message: "Ce pseudonyme est déjà utilisé.", error: "pseudonymeAlreadySet"} , { status: 409} )  
    }
    
    //si pas l'user est nouveau on l'enregistre dans la base de donnée
    if (data.lastname === "")
        data.lastname = null;
    if (data.firstname === "")
        data.firstname = null;
    
    data.password = await bcrypt.hash(data.password, 10)
    const newUser = await prisma.user.update({
        where: {
            email: data.email
        },
        data: {
            email: data.email,
            firstname: data.firstname,
            lastname: data.lastname,
            pseudonyme: data.pseudonyme,
            password: data.password,
        }
    })
    return NextResponse.json({message: "Modifications enregistrées", error: false}, {status: 200})
}