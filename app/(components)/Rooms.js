"use client";

import React from "react";
import { db, doc } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import Roomsclient from "../(components)/Roomsclient";
import {  onSnapshot } from "firebase/firestore";
import Cookies, { Cookie } from "universal-cookie";
import Image from 'next/image'
import chessjpg from "/public/chess.jpg"


 export default function Rooms() {



  const [data, setdata] = React.useState([]);
  const [fetch, setfetch] = React.useState(false);

  

  React.useEffect(()=>{
  const snap=   onSnapshot(collection(db,"rooms"),(snapshot)=>{
      setfetch(snapshot)
    })

    return snap()
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
 
    <div className="grid h-screen w-screen overflow-x-scroll">
    


    <Image src={chessjpg} className="h-screen w-screen absolute object-cover" alt="chessimg"/>
  



      <Roomsclient data={data} />
    </div></div>
  );
}
