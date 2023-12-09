import React from "react";
import Nawbar from "../(components)/Nawbar";
import { db } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import FriendChatComponent from "../(components)/FriendChatComponent";
import { redirect } from "next/navigation";
import chessjpg from "/public/chess.jpg"
import Image from "next/image";
export default async function page({ params, searchParams }) {
  const paramscchat = searchParams.chat;
  const loggeduser = await currentUser();
  const currentuseremail = loggeduser?.emailAddresses[0]?.emailAddress;

  if (!paramscchat) {
    redirect("/");
  }

  const docRef = doc(db, "chats", paramscchat);

  let chat = await getDoc(docRef);

  if (!chat.exists) {
    redirect("/");
  }

  let chatdata = chat.data();

let Chat=chatdata.chat

  if (!chatdata?.access?.includes(currentuseremail)) {
    redirect("/");
  }

const seconduserindex =  chatdata.access.indexOf(currentuseremail)=== 0 ? 1 : 0 
const seconduser = chatdata.access[seconduserindex]





  return (
    <>
      <Nawbar paramscchat={paramscchat}/>
      <Image  src={chessjpg} className='h-screen w-screen absolute object-cover' alt='chess'/>
        <FriendChatComponent chat={Chat} id={paramscchat} seconduser={seconduser} 
        
        currentuser={currentuseremail }   src={loggeduser?.imageUrl}/>

    </>
  );
}
