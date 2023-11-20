"use client";
import React from "react";
import { auth, provider  } from "../(firebase)/firebase";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { getRedirectResult } from "firebase/auth";
import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from 'next/navigation'
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../(firebase)/firebase";

const cookies = new Cookies();



export default function Auth(props) {

  const router= useRouter()
React.useEffect(async ()=>{
 const result= await getRedirectResult(auth) 

if(result){
  const user = result.user
  const docRef = doc(db, "users",user.email);
  const docSnap = await getDoc(docRef);
  cookies.set("auth-token", result.user.refreshToken);
  cookies.set("src",user.photoURL);
  cookies.set("email",user.email)
  cookies.set("displayname",user.displayName)

    if(!docSnap.exists()){

      await setDoc(docRef,{
        history:true,
        user:user.email,
        photoURL:user.photoURL,
        displayName:user.displayName,
        Description:"",
      })

    }


     router.refresh()
}



},[])









 
    const signIn = async () => {
      
    
        try {
 
  await signInWithRedirect(auth, provider);  
        
        } catch (err) {
          
          
        }
      };
      

    return (
      <button
        type="button"
        onClick={signIn}
        className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
       Zaloguj się przez Google
      </button>
    );
  




}
