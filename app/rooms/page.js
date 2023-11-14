import React from 'react'
import Rooms from "../(components)/Rooms";
import Nawbar from "../(components)/Nawbar";
import { collection } from 'firebase/firestore';
import { db } from '../(firebase)/firebase';
import { getDocs } from 'firebase/firestore';

export default async function page() {






  return (
    <div>
    <Nawbar/>
   <Rooms /></div>
  )
}

