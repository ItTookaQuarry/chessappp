"use client";
import { Button } from "@nextui-org/react";
import React from "react";
import { chatfriendsaction } from "../actions";
import { db } from "../(firebase)/firebase";
import { Badge, Avatar } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { getDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
export default function FriendChatComponent(props) {


 async function updatechat (){
    const src = props.src ;
    const text = value
    const chat = props.id
    const email = props.currentuser
    const seconduser = props.seconduser
  
    const docRef = doc(db, "chats", chat);
    const data = await getDoc(docRef);
    const dataa = data.data();
  
    const msgs = dataa?.chat;
  
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
  
  
  
setValue("")











}




  const [chatab, setchat] = React.useState([]);

  const [value, setValue] = React.useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  React.useEffect(() => {
    onSnapshot(doc(db, "chats", `${props.id}`), (doc) => {
      const data = doc.data();
      setchat(data.chat.splice(1, data.chat.length - 1));
    });
  }, []);

  return (
    <>
      <>
        <div className="grid">
          <br></br>
          <div
            className="grid rounded-md h-[200px] lg:w-[500px] w-[300px] lg:h-[300px] overflow-y-scroll scroll-auto rotate-180 backdrop-brightness-0
  col-span-full m-auto"
          >
            <div className="rotate-180 grid gap-1 m-auto">
              {[...chatab].map((each, index) => {
                return (
                  <div className="flex gap-2" key={index}>
                    <Avatar className="h-[50px] w-[50px] " src={each.image} />{" "}
                    <Textarea
                      isReadOnly
                      variant="bordered"
                      labelPlacement="outside"
                      defaultValue={each.text}
                      className="w-auto"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <br></br>
          <form
            className=" flex gap-10  m-auto justify-center h-full w-full px-10 "
          >
            <input value={props.seconduser} name="seconduser" className="hidden 0" />
            <Textarea
            onChange={onChange}
            value={value}
              name="text"
              placeholder="Napisz wiadomość"
              className="max-w-xs text-sm h-auto"
            />

            <Button
            onClick={()=>{
              
              updatechat()
              }}
              color="success"
              variant="bordered"
              startContent={<FaLongArrowAltRight />}
              name="button"
              value={props.id}

              className="backdrop-brightness-0"
            ></Button>
          </form>
        </div>{" "}
      </>
    </>
  );
}
