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

export async function chatfriendsaction(FormData) {
  const user = await currentUser();
  const src = user.imageUrl;
  const text = FormData.get("text");
  const chat = FormData.get("button");
  const email = user.emailAddresses[0].emailAddress;
  const seconduser = FormData.get("seconduser");

  const docRef = doc(db, "chats", chat);
  const data = await getDoc(docRef);
  const dataa = data.data();

  const msgs = dataa.chat;

  await updateDoc(docRef, {
    chat: [...msgs, { text: text, image: src }],
  });

  const Seconduseref = doc(db, "users", seconduser);


  const document = await getDoc(Seconduseref);
  const Seconduserdata = document.data();


  const tabletoreturn = Seconduserdata.friends.map((each) => {
    if (each.friend.email !== email) {
      return each;
    }
    if (each.friend.email === email) {
      const toreturn =
        each.nots === undefined
          ? { ...each, nots: 1 }
          : { ...each, nots: each.nots + 1 };
          return toreturn 
    }
  });



await updateDoc((Seconduseref),{...Seconduserdata,
friends: tabletoreturn})






  revalidatePath("/chat");
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

  if (inviteddatainvites === undefined || inviteddatainvites.length < 1) {
    inviteddatatab = [{
      email : invitedData.user,
      src : invitedData.photoURL,
      name:invitedData.displayName
    }];





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
    inviteddatatab = [...inviteddatainvites, {
      email : invitedData.user,
      src : invitedData.photoURL,
      name:invitedData.displayName
    }];

    updateDoc(invitesRef, {
      connections: {
        invited: inviteddatatab,
      },
    });
  }

  if (
    invitedData?.notifications?.invites === undefined ||
    invitedData?.notifications?.invites.length < 1
  ) {
    updateDoc(invitedRef, {
      notifications: {
        invites: 1,
        invitesusers: [{
          email : invitesData.user,
          src : invitesData.photoURL,
          name:invitesData.displayName
        }],
      },
    });
  }

  if (
    invitedData?.notifications?.invites !== undefined &&
    !invitedData?.notifications?.invitesusers.includes(invites)
  ) {
    updateDoc(invitedRef, {
      notifications: {
        invites: invitedData?.notifications?.invites + 1,
        invitesusers: [...invitedData?.notifications?.invitesusers, {
          email : invitesData.user,
          src : invitesData.photoURL,
          name:invitesData.displayName
        },],
      },
    });
  }

  revalidatePath("/user");
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
      invited: inviteddatainvites.filter((each) => {
        return each !== invited;
      }),
    },
  });

  if (invitedData?.notifications?.invitesusers.includes(invites)) {
    let inv =
      invitedData?.notifications?.invites - 1 < 0
        ? 0
        : invitedData?.notifications?.invites - 1;

    updateDoc(invitedRef, {
      notifications: {
        invites: inv,
        invitesusers: invitedData?.notifications?.invitesusers.filter(
          (each) => {
            return each !== invites;
          }
        ),
      },
    });
  }

  revalidatePath("/user");
}
