

import React from 'react'

import { cookies } from 'next/headers'
import Nawnotlogged from './(components)/Nawnotlogged'
import NawLoggedIn from './(components)/NawLoggedIn'
import { auth } from './(firebase)/firebase'
import Mainpage from './(components)/Mainpage'
import Image from 'next/image'
import chessjpg from "/public/chess.jpg"
export default  async function() {
  

  const cookieStore = cookies()
  const authe = cookieStore.get('auth-token')


  return (
  <>

  <Image  src={chessjpg} className='h-screen w-screen absolute object-cover'/>
  {!authe&&<Nawnotlogged /> }
  {authe&&<NawLoggedIn />}

  <Mainpage />
  

 </>



 

  )
}
