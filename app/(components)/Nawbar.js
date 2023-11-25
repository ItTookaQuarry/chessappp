import React from "react";
import { cookies } from "next/headers";
import { db } from "../(firebase)/firebase";
import { collection, getDocs } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Nawbarclient from "./Nawbarclient.js";
export default async function Nawbar(props) {
  const user = await currentUser();

  const datatable = [];
  const colRef = collection(db, "users");

  const docsSnap = await getDocs(colRef);
  docsSnap.forEach((doc) => {
    const data = doc.data();

    datatable.push({
      label: data.displayName,
      value: data.user,
      userphoto: data.photoURL,
      key: data.user,
    });
  });

  const cookieStore = cookies();

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


  return <Nawbarclient user={user}  data={datatable}/>;
}
