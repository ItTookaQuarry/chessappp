import React from "react";
import { cookies } from "next/headers";
import { db } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";

import Nawbarclient from "./Nawbarclient.js";
export default async function Nawbar(props) {
  const user = await currentUser();

  const datatable = [];
  const colRef = collection(db, "users");

  let currentUserdata = [];
  const docsSnap = await getDocs(colRef);
  docsSnap.forEach((doc) => {
    const data = doc.data();
    const id = doc.id;
    if (data.user === user?.emailAddresses[0]?.emailAddress) {
      currentUserdata.push(data);
    }

    datatable.push({
      label: data.displayName,
      value: data.user,
      userphoto: data.photoURL,
      key: data.user,
      id: id,
    });
  });

  if (user) {
    const sign = async (user) => {
      try {
        const docRef = doc(db, "users", user.emailAddresses[0].emailAddress);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          await setDoc(docRef, {
            history: true,
            user: user.emailAddresses[0].emailAddress,
            photoURL: user.imageUrl,
            displayName: `${user.firstName} ${user.lastName}`,
            Description: " ",
          });
        }
      } catch (err) {}
    };

    sign(user);
  }

  const inviteusersemails = currentUserdata[0]?.notifications?.invitesusers
  let inviteusersemailsfiltred;

  if (inviteusersemails !== undefined) {
    inviteusersemailsfiltred = [...datatable].filter((each) => {
      return inviteusersemails.includes(each.id);
    });
  }

  const friends = currentUserdata[0]?.friends






let friendstable

  if (friends !== undefined) {

    let friendsmapped=friends.map((each)=>{
      return each.friend
    })





    friendstable = [...datatable].filter((each) => {
return  friendsmapped.includes(each.id)


    }).map((each)=>{

const index  =  friendsmapped?.indexOf(each.id)
console.log(friendsmapped,each.id,index,friends[index])
const toreturn = friends[index]?.nots === undefined ?            {...each,chat:friends[index]?.chatromm } :
{...each,chat:friends[index]?.chatromm,nots:friends[index]?.nots }

return toreturn 
    });




  }

console.log(  friendstable )



  return (
    <Nawbarclient
    friends={friendstable}
      user={user}
      data={datatable}
      invites={inviteusersemailsfiltred}
      nots={currentUserdata[0]?.notifications?.invites}
    />
  );
}
