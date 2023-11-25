'use server'
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache";
import { db } from "./(firebase)/firebase";
import { currentUser } from "@clerk/nextjs";
export async function myAction(FormData) {

    const desc=FormData.get("desciption")

    const user = await currentUser();

    const docRef = doc(db,"users",`${user.emailAddresses[0].emailAddress}`);


await updateDoc(docRef,{
    Description:desc
}) 

    


revalidatePath('/account') 
}