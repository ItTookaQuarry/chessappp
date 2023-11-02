"use client";
import React from "react";
import { auth, provider } from "../(firebase)/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from 'next/navigation'

const cookies = new Cookies();




export default function Auth() {
    const router= useRouter()
    
    const signIn = async () => {
    
        try {
          
          const result = await signInWithPopup(auth, provider);
          const user = result.user
          cookies.set("auth-token", result.user.refreshToken);
          cookies.set("src",user.photoURL);
          cookies.set("email",user.email)
          cookies.set("displayname",user.displayName)

          router.refresh()

 
        
        } catch (err) {
          console.log(`There was an error - ${err}`);
          
        }
      };
      

    return (
      <button
        type="button"
        onClick={signIn}
        className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
        Sign in with google
      </button>
    );
  




}
