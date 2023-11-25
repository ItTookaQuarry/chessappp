import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs';
export async function GET() {
  const {userId} = auth();
  const user = await currentUser();
//   if(!userId){
//     return new Response("Unauthorized", { status: 401 });
//   }
 
 
  return NextResponse.json(user);
}