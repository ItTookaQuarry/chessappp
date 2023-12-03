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
export default function FriendChatComponent(props) {
  const [chatab, setchat] = React.useState([]);

  React.useEffect(() => {
    onSnapshot(doc(db, "chats", `${props.id}`), (doc) => {
      const data = doc.data();
      setchat(data.chat.splice(1,data.chat.length-1));
    });
  }, []);



  return (<>
 













































<>

      <div className="grid">
  
      <br></br>
    <div className='grid h-[100px] lg:w-[500px] w-[500px] overflow-y-scroll scroll-auto rotate-180 backdrop-brightness-0
  col-span-full m-auto'>
   

    <div className='rotate-180 grid gap-1 m-auto'>
{[...chatab].map((each,index)=>{

  return (    <div className='flex gap-2' key={index}>
  <Avatar className='h-[50px] w-[50px] ' src={each.image}/>    <Textarea
  isReadOnly
  variant="bordered"
  labelPlacement="outside"

  defaultValue={each.text}
  className="w-auto"
/></div>
)
})}
      



      </div>
      

</div>


<br></br>
<form
className=" flex gap-10  m-auto justify-center h-full w-full px-10 "
action={chatfriendsaction}
>
<input value={231} name="color" className="hidden 0" />
<Textarea
  name="text"
  placeholder="Napisz wiadomość"
  className="max-w-xs text-sm h-auto"
/>

<Button
  color="success"
  variant="bordered"
  startContent={<FaLongArrowAltRight />}
  name="button"
  value={props.id}
  type="submit"
  className="backdrop-brightness-0"
></Button>
</form> 
      </div>   </>


















</>

  );
}
