import React from "react";
import { deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import Nawbar from "../(components)/Nawbar";
import { cookies } from "next/headers";
import { currentUser } from '@clerk/nextjs'
import { redirect } from "next/navigation";
import User from "../(components)/User";

export default async function page() {


  const user = await currentUser();
  const email= user.emailAddresses[0].emailAddress
  const src= user.imageUrl
  const  name =`${user.firstName} ${user.lastName}`



    if (!user) {
      redirect("/");
    }
  
  
    const docRef = doc(db, "users",`${email}`);
  
    const docSnap = await getDoc(docRef);
  
    const data = docSnap.data();


    let tab = [];
    const querySnapshot = await getDocs(collection(db, "histories"));
    querySnapshot.forEach((doc) => {
      if(doc.data().white===name||doc.data().black===name){tab.push(doc.data());}
   
    });

  return (
    <>
      <Nawbar />
      <div>
        <User data={data}
        
        cookie={email}
        
        history={

tab.map((each)=>{

    return {...each,
    
    number:each.time.year+
    each.time.month+each.time.minute+
    each.time.day
    }




})

        }
          
          
          />
      </div>
    </>
  )
}
