"use client"
import React from 'react'
import {v4 as uuidv4} from 'uuid';
import Link from 'next/link';

import Cookies, { Cookie } from "universal-cookie";

export default function Mainpage(props) {



  const cookies = new Cookies();


  const cookie= cookies.get("temporaryvalue")

React.useEffect(()=>{




  if(!cookie){
    cookies.set("temporaryvalue",uuidv4())
  }



}



,[])




  return (
    <>
  <div className='relative col-span-full lg:p-40 grid backdrop-brightness-50'>
  <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Aplikacja do grania w szachy</h1>
<strong>
  <h2 class="mb-6 text-lg font-normal text-white lg:text-xl sm:px-16 xl:px-48 dark:text-white">Graj ze znajomymi.</h2></strong>
<Link href="rooms" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 m-auto">
Graj
    <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
  </svg>

</Link>
</div>
</>
  )
}
