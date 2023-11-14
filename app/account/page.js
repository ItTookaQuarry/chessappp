
import React from 'react'
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../(firebase)/firebase';
import Nawbar from "../(components)/Nawbar";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import User from "../(components)/User";
export default async function page() {
  const cookieStore = cookies()

  const email = cookieStore.get('email')?.value

  if (email===undefined) {
    redirect('/')
  }



  const docRef = doc(db,"users",`${email}`);



  const docSnap = await getDoc(docRef);

  const data=docSnap.data()
  console.log(data)
  return (
    <>
    <Nawbar/>
    <div ><User data={data}/></div></>
  )
}
