import React from "react";
import Nawbar from "../(components)/Nawbar";
import { deleteDoc, doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Anotheruserhistory from "../(components)/Anotheruserhistory";
import Usercard from "../(components)/Usercard";
export default async function page({ params,searchParams }) {

const user=searchParams.user
  const loggeduser = await currentUser();




  if (!loggeduser ||user===undefined||
    loggeduser?.emailAddresses[0]?.emailAddress===user) {
    redirect("/");
  }

const currentuseremail= loggeduser?.emailAddresses[0]?.emailAddress














  const docRef = doc(db, "users", `${user}`);

  const docSnap = await getDoc(docRef);

let tab=[]
  const data = docSnap.data();
let name = data.displayName
  const querySnapshot = await getDocs(collection(db, "histories"));
  querySnapshot.forEach((doc) => {
    
    if (doc.data().white === name || doc.data().black === name) {
     
      tab.push(doc.data());
    }
  });


  let status = false
  if( data?.notifications?.invitesusers &&  data?.notifications?.invitesusers.map((each)=>{
    return each.email
  }).includes(currentuseremail) ){
  
  status = "invited"
  
  }
  
  if(data?.friends && data?.friends.map((each)=>{
    return each.friend.email
  }).includes(currentuseremail) ){
    status="friends"
  }

  



  return (
    <div className="grid gap-10">
    <div>     <Nawbar /></div>
 
      <Usercard data={data} withoutform={true} user={user} status={status}/>

      {data.history && (
        <Anotheruserhistory
          history={tab.map((each) => {
            return {
              ...each,

              number:
                each.time.year +
                each.time.month +
                each.time.minute +
                each.time.day,
            };
          })}
        />
      )}

      {!data.history && (
        <div
          class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md w-[screen] md:w-[500px] lg:w-[500px] m-auto col-span-full "
          role="alert"
        >
          <div class="flex">
            <div class="py-1">
              <svg
                class="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p class="font-bold">Historia gier użytkownika jest prywatna</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
