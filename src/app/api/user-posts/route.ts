import { getUserId, getUserPosts } from "@/actions";
import { NextRequest, NextResponse } from 'next/server';
import prisma
 from "../../../../prisma";
export async function GET(){
    const userId = await getUserId();
    const posts = await getUserPosts();
    if (posts){
        return NextResponse.json({userId: userId, posts: posts}, {status: 200})
    }
    return NextResponse.json({message: "pas de posts"}, {status: 409})
}

export async function POST(req: NextRequest, res: NextResponse){
    const data = await req.json();
    console.log(data)
    const newPost = await prisma.post.create({
        data:{
            content: data.content,
            userId: data.userId
        }
    })
    return NextResponse.json({message: "ok"}, {status: 200})
}  