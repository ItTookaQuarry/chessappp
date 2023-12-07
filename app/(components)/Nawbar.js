import React from "react";
import { db } from "../(firebase)/firebase";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { cookies } from 'next/headers'
import Nawbarclient from "./Nawbarclient.js";
export default async function Nawbar(props) {
  const cookieStore = cookies()
  



  const user = await currentUser();
  const chatid =  props.paramscchat
 const chatidcookie = cookieStore.get("id")
 
console.log(chatidcookie,123)



  const datatable = [];
  const colRef = collection(db, "users");

  let currentUserdata = [];
  const docsSnap = await getDocs(colRef);
  docsSnap.forEach((doc,index) => {
    const data = doc.data();
    const id = doc.id;
    if (data.user === user?.emailAddresses[0]?.emailAddress) {
      currentUserdata.push(data);
    }

    datatable.push({
      label: data?.displayName,
      value: data?.user,
      userphoto: data?.photoURL,
      key: data?.user,
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
            user: user.emailAddresses[0]?.emailAddress,
            photoURL: user?.imageUrl,
            displayName: `${user.firstName} ${user.lastName}`,
            Description: " ",
          });
        }
      } catch (err) {}
    };

    sign(user);
  }

  const inviteusersemailsfiltred = currentUserdata[0]?.notifications?.invitesusers




  const friends = currentUserdata[0]?.friends


let msgnots=0




  if (friends !== undefined) {

    let friendsmapped=friends.map((each,index)=>{
     
      if((each?.chatromm===props?.paramscchat&&friends[index].nots>0 ) || 
      chatidcookie ) {

     


        friends[index].nots=0
        
        updateDoc(doc(db,"users",user.emailAddresses[0].emailAddress),{
          friends:friends
        })
      }


      if(each.nots!==undefined &&
        each?.chatromm!==props?.paramscchat){
        msgnots = msgnots + each.nots
      }
      return each.friend
    })

  }



  return (
    <Nawbarclient
    main={props.main}
    msgnots = {msgnots}
    paramscchat={chatid }
     friends={friends}
      user={user}
      data={datatable}
      invites={inviteusersemailsfiltred}
      nots={currentUserdata[0]?.notifications?.invites}
    />
  );
}
