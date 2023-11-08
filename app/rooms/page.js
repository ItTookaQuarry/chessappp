"use client";

import React from "react";
import { db, doc } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import Roomsclient from "../(components)/Roomsclient";
import {  onSnapshot } from "firebase/firestore";
import Cookies, { Cookie } from "universal-cookie";
import Image from 'next/image'
import chessjpg from "/public/chess.jpg"
import { Suspense } from "react";
import Nawnotlogged from '../(components)/Nawnotlogged'
import NawLoggedIn from '../(components)/NawLoggedIn'
 export default function Page() {


  const cookies = new Cookies();

  const authe = cookies.get('auth-token')


  const [data, setdata] = React.useState([]);
  const [fetch, setfetch] = React.useState(false);

  

  React.useEffect(()=>{
    onSnapshot(collection(db,"rooms"),(snapshot)=>{
      setfetch(snapshot)
    })
  },[])




  const datafetching = async () => {

    const datatable = [];
    const colRef = collection(db, "rooms");

    const docsSnap = await getDocs(colRef);
    docsSnap.forEach((doc) => {
      datatable.push(doc);
    });
    setdata(datatable);
  };

  React.useEffect(() => {
    datafetching();
  }, [fetch]);




  return (
    <div>
    {!authe&&<Nawnotlogged /> }
  {authe&&<NawLoggedIn />}
    <div className="grid h-screen w-screen overflow-x-scroll">
    


    <Image src={chessjpg} className="h-screen w-screen absolute object-cover"/>
  



      <Roomsclient data={data} />
    </div></div>
  );
}
