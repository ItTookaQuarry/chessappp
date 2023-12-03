
"use client"
import { Button } from '@nextui-org/react';
import React from 'react'
import { chatfriendsaction} from '../actions';
import { db } from '../(firebase)/firebase';
import {Badge, Avatar} from "@nextui-org/react";
import { Textarea } from '@nextui-org/react';
import { FaLongArrowAltRight } from "react-icons/fa";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from 'next/router';
export default function FriendChatComponent(props) {




  const [chatab,setchat]= React.useState([])







const unsub = onSnapshot(doc(db, "chats", `${props.id}`), (doc) => {

  
  const data = doc.data()
    setchat(data.chat)
});
















  return (
   
 
<div className='grid grid-cols-4 w-screen h-5/6'>
    <div className='grid  m-auto  scroll-auto rotate-180 lg:col-start-2 lg:col-span-1 w-[500px]
    
    col-span-full m-auto h-5/6'>
   

     <div className='rotate-180 grid gap-5  grid backdrop-brightness-0 h-[200px] overflow-y-scroll'>
{[...chatab].map((each,index)=>{

  return (    <div className='flex gap-2 ml-20 ' >
  <Avatar className='lg:h-[120px] lg:w-[120px] h-[80px] w-[80px]'
  src={each.image} />    <Textarea
  isReadOnly
  variant="bordered"
  labelPlacement="outside"
  defaultValue={each.text}
  className="w-auto"
/>
<br></br>
</div>
)
})}
      



      </div> 
      

</div>


<br></br>

<form className=' flex gap-10  m-auto col-span-full w-screen justify-center '  

action={chatfriendsaction}>
  <input value={231} name="color" className='hidden 0' /> 
      <Textarea
      name="text"
      placeholder="Napisz wiadomość"
      className="max-w-xs text-sm h-auto"
    />



<Button color="success" variant="bordered" startContent={< FaLongArrowAltRight/>}  name='button' value={props.id}
type='submit' className='backdrop-brightness-0'>

      </Button>




     </form>   

     </div>












  
     
  
  )
}
