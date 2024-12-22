import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from './actions'
 import prisma
  from '../prisma';
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const session = await getSession();
    if (session.isLoggedIn){
        return NextResponse.redirect(new URL('/', request.url))
    }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/inscription',
            '/connection',
  ]         
}