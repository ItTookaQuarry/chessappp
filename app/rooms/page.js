"use client";

import React from "react";
import { db, doc } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import Roomsclient from "../(components)/Roomsclient";
import {  onSnapshot } from "firebase/firestore";
import Cookies, { Cookie } from "universal-cookie";
import Image from 'next/image'
import chessjpg from "/public/chess.jpg"

 export default function Page() {


  const cookies = new Cookies();


  const cookie= cookies.get("temporary")
  const auth= cookies.get("auth-token")

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

    <div className="grid h-screen w-screen overflow-x-scroll">
    <Image src={chessjpg} fill/>
  

      <Roomsclient data={data} />
    </div>
  );
}
