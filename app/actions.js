"use server";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { db } from "./(firebase)/firebase";
import { currentUser } from "@clerk/nextjs";
export async function myAction(FormData) {
  const desc = FormData.get("desciption");

  const user = await currentUser();

  const docRef = doc(db, "users", `${user.emailAddresses[0].emailAddress}`);

  await updateDoc(docRef, {
    Description: desc,
  });

  revalidatePath("/account");
}

export async function ChatAction(FormData) {
  const user = await currentUser();
  const src = user.imageUrl;
  const text = FormData.get("text");
  const room = FormData.get("button");
  const color = FormData.get("color");
  const docRef = doc(db, "rooms", room);
  const data = await getDoc(docRef);
  const dataa = data.data();

  const table =
    dataa.Chat !== undefined
      ? [...dataa.Chat, { text: text, image: src }]
      : [{ text: text, image: src }];

  let notificationsblack;
  let notificationswhite;

  if (color === "white") {
    notificationswhite =
      dataa.notificationswhite !== undefined ? dataa.notificationswhite + 1 : 1;
    await updateDoc(docRef, {
      Chat: table,
      notificationswhite: notificationswhite,
    });
  }

  if (color === "black") {
    notificationsblack =
      dataa.notificationsblack !== undefined ? dataa.notificationsblack + 1 : 1;
    await updateDoc(docRef, {
      Chat: table,
      notificationsblack: notificationsblack,
    });
  }
}

export async function addtofriends(FormData) {
  const invited = FormData.get("invited");
  let invitesuserdata = await currentUser();
  const invites = invitesuserdata.emailAddresses[0].emailAddress;

  const invitedRef = doc(db, "users", invited);
  const invitesRef = doc(db, "users", invites);
  let invitedData = await getDoc(invitedRef);
  invitedData = invitedData.data();
  let invitesData = await getDoc(invitesRef);
  invitesData = invitesData.data();

  const inviteddatainvites = invitesData?.connections?.invited;

  let inviteddatatab;


  if (inviteddatainvites === undefined||inviteddatainvites.length<1 ) {
    inviteddatatab = [invited];

    updateDoc(invitesRef, {
      connections: {
        invited: inviteddatatab,
      },
    });
  }

  if (
    inviteddatainvites !== undefined &&
    !inviteddatainvites.includes(invited)
  ) {
    inviteddatatab = [...inviteddatainvites, invited];

    updateDoc(invitesRef, {
      connections: {
        invited: inviteddatatab,
      },
    });
  }

  if (invitedData?.notifications?.invites === undefined ||
    invitedData?.notifications?.invites.length<1  ) {
    updateDoc(invitedRef, {
      notifications: {
        invites: 1,
        invitesusers: [invites],
      },
    });
  }

  if (
    invitedData?.notifications?.invites !== undefined  &&
    !invitedData?.notifications?.invitesusers.includes(invites) 
  ) {
    updateDoc(invitedRef, {
      notifications: {
        invites: invitedData?.notifications?.invites + 1,
        invitesusers: [...invitedData?.notifications?.invitesusers, invites],
      },
    });
  }

  revalidatePath("/user")
}



export async function deleteinvite(FormData) {
    const invited = FormData.get("invited");
    let invitesuserdata = await currentUser();
    const invites = invitesuserdata.emailAddresses[0].emailAddress;
  
    const invitedRef = doc(db, "users", invited);
    const invitesRef = doc(db, "users", invites);
    let invitedData = await getDoc(invitedRef);
    invitedData = invitedData.data();
    let invitesData = await getDoc(invitesRef);
    invitesData = invitesData.data();
  


    const inviteddatainvites = invitesData?.connections?.invited;



    updateDoc(invitesRef, {
        connections: {
          invited: inviteddatainvites.filter((each)=>{
            return each!==invited
          }) ,
        },
      });
    
if(invitedData?.notifications?.invitesusers.includes(invites)){


let inv = invitedData?.notifications?.invites - 1 <0 ? 0 : 
invitedData?.notifications?.invites - 1



      updateDoc(invitedRef, {
        notifications: {
          invites: inv,
          invitesusers: invitedData?.notifications?.invitesusers.filter((each)=>{
            return each!== invites
          })
        },
      });
  
    }

    revalidatePath("/user")





  }

  
