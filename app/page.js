

import React from 'react'

import Nawbar from "./(components)/Nawbar";
import Mainpage from './(components)/Mainpage'
import Image from 'next/image'
import chessjpg from "/public/chess.jpg"
export default   function Page() {
  




  return (
  <>
<Nawbar/>
  <Image  src={chessjpg} className='h-screen w-screen absolute object-cover' alt='chess'/>


  <Mainpage />
  

 </>



 

  )
}
