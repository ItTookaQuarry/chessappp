"use client"
import React from 'react'
import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from '../(firebase)/firebase';
const cookies = new Cookies();






export default function SignOut() {
    const router= useRouter()
    const Signout = async () => {
const signout= signOut(auth).then(() => {
  // Sign-out successful.
}).catch((error) => {
  // An error happened.
});

signout




        cookies.remove("auth-token")
        router.push("/?logged=false")
        };
   
  return (
    <button
    type="button"
    onClick={Signout}
    class=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
  >
  Sign Out
  </button>
  )
}
