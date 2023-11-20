
import React from 'react'
import Nawlogged from './NawLoggedIn.js'
import Nawnotlogged from './Nawnotlogged.js'
import { cookies } from 'next/headers'
import { db, doc } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getRedirectResult } from "firebase/auth";
import { auth } from '../(firebase)/firebase';
export default async function Nawbar(props) {

  const datatable = [];
  const colRef = collection(db, "users");

  const docsSnap = await getDocs(colRef);
  docsSnap.forEach((doc) => {
const data=doc.data()

    datatable.push({label:data.displayName,
    value:data.user,
  userphoto:data.photoURL,
key:data.user});
  });
 





  const cookieStore = cookies()

  const authe = cookieStore.get('auth-token')
  const email = cookieStore.get('email')?.value

      

  return (

    <div >{!authe&&<Nawnotlogged  cookie={email}/> }
  {authe&&<Nawlogged usersdata={datatable} 
  
  cookie={email}
  
  />}</div>
  )
}
