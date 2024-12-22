import { getSession } from '@/actions';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma';

export async function GET(){
    const session = await getSession();
    console.log(session)
    if (session.isLoggedIn){
        const user = await prisma.user.findUnique({
            where:{
                pseudonyme: session.userPseudonyme
            }
        })
        if (user){
            return NextResponse.json({email: user.email, pseudonyme : user.pseudonyme, password : user.password}, {status: 200});
        }
    }
}