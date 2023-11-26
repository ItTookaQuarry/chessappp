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



export async function ChatAction(FormData) {
    const user = await currentUser();
    const src= user.imageUrl
      const text=FormData.get("text")
       const room = FormData.get("button")
const color= FormData.get("color")
    const docRef = doc(db,"rooms",room);
const data= await getDoc(docRef)
const dataa= data.data()


const table= dataa.Chat !== undefined ? [...dataa.Chat,{text:text,
image:src}] : [{text:text,
    image:src}]

let notificationsblack
let notificationswhite


if(color==="white"){
    notificationswhite = dataa.notificationswhite !==undefined 
    ? dataa.notificationswhite + 1 : 1
    await updateDoc(docRef,{
        Chat:table,
        notificationswhite:notificationswhite
    
    }) 
    
        

}

if(color==="black"){
    notificationsblack = dataa.notificationsblack!==undefined 
    ? dataa.notificationsblack + 1 : 1
    await updateDoc(docRef,{
        Chat:table,
        notificationsblack:notificationsblack
    
    }) 
    
        

}





    



}