"use client";
import React from "react";

import Cookies, { Cookie } from "universal-cookie";
import { useRouter } from 'next/navigation'
import { SignInButton } from "@clerk/nextjs";



export default function Auth() {







    
    
      

    return (
      <div
   
        className=" text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
      >
  <SignInButton />
      </div>
    );
  




}
