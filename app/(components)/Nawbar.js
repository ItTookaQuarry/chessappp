
import React from 'react'
import NawLoggedIn from './NawLoggedIn.js'
import Nawnotlogged from './NawNotLogged.js'
import { cookies } from 'next/headers'
export default function Nawbar() {


  const cookieStore = cookies()

  const authe = cookieStore.get('auth-token')

  return (
    <div >{!authe&&<Nawnotlogged /> }
  {authe&&<NawLoggedIn />}</div>
  )
}
