import React from "react";
import { deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import Nawbar from "../(components)/Nawbar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import User from "../(components)/User";

export default async function page() {
return   <div>12</div>

//   const cookieStore = cookies();

//   const email = cookieStore.get("email")?.value;

//   if (email === undefined) {
//     redirect("/");
//   }

//   const name= cookieStore.get("displayname").value


//   const docRef = doc(db, "users", `${email}`);

//   const docSnap = await getDoc(docRef);

//   const data = docSnap.data();
//   let tab = [];
//   const querySnapshot = await getDocs(collection(db, "histories"));
//   querySnapshot.forEach((doc) => {
//     if(doc.data().white===name||doc.data().black===name){tab.push(doc.data());}
 
//   });

//   return (
//     <>
//       <Nawbar />
//       <div>
//         <User data={data}
        
//         cookie={email}
        
//         history={

// tab.map((each)=>{

//     return {...each,
    
//     number:each.time.year+
//     each.time.month+each.time.minute+
//     each.time.day
//     }




// })

//         }
          
          
//           />
//       </div>
//     </>
  
}
