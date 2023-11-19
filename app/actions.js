'use server'
import {  doc, getDoc, updateDoc } from "firebase/firestore";
import { cookies } from 'next/headers'
import { revalidatePath } from "next/cache";
import { db } from "./(firebase)/firebase";
export async function myAction(FormData) {

    const desc=FormData.get("desciption")
    const cookieStore = cookies()
    const email = cookieStore.get('email')?.value
    const docRef = doc(db,"users",`${email}`);


await updateDoc(docRef,{
    Description:desc
}) 

    


// revalidatePath('/account') 
}