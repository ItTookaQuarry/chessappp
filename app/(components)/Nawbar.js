
import React from 'react'
import NawLogged from './NawLoggedIn.js'
import Nawnotlogged from './Nawnotlogged.js'
import { cookies } from 'next/headers'
export default function Nawbar() {


  const cookieStore = cookies()

  const authe = cookieStore.get('auth-token')

  return (
    <div >{!authe&&<Nawnotlogged /> }
  {authe&&<NawLogged/>}</div>
  )
}
