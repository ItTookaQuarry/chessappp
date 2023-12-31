import React from 'react'
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { CiChat2 } from "react-icons/ci";
import {Badge, Avatar} from "@nextui-org/react";
import { Textarea } from '@nextui-org/react';
import { getDoc } from 'firebase/firestore';
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../(firebase)/firebase';

export default function Popoverchatcomponent(props) {
const color = props.color === "white" ? "black" : "white"


const [value, setValue] = React.useState('');

const onChange = (event) => {
  setValue(event.target.value);
};











 async function ChatAction() {

  const src = props.src
  const text = value
  if(text?.length===0){
    return 
  }
  const room = props.url
  const color = props.color 
  const docRef = doc(db, "rooms", room);
  const data = await getDoc(docRef);
  const dataa = data.data();

  const table =
    dataa.Chat !== undefined
      ? [...dataa.Chat, { text: text, image: src }]
      : [{ text: text, image: src }];

  let notificationsblack;
  let notificationswhite;

  if (color === "black") {
    notificationswhite =
      dataa.notificationswhite !== undefined ? dataa.notificationswhite + 1 : 1;
    await updateDoc(docRef, {
      Chat: table,
      notificationswhite: notificationswhite,
    });
  }

  if (color === "white") {
    notificationsblack =
      dataa.notificationsblack !== undefined ? dataa.notificationsblack + 1 : 1;
    await updateDoc(docRef, {
      Chat: table,
      notificationsblack: notificationsblack,
    });
  }
  setValue("")
}






















  return (<>
    <Popover placement='top'
    className="lg:w-[400px] w-[300px]"
    disableAnimation={true}
    >
      
      <PopoverTrigger >
   <div> 
   <Badge content={props.notifications} color="primary" href="#scroll " >
    <CiChat2 size={"2.5em"} onClick={()=>{props.setnotifications(null)
    
    const docRef = doc(db,"rooms",props.url);

    if(props.color==="white"){
      updateDoc(docRef,{
        notificationswhite:null
      }
      )
    }

    if(props.color==="black"){
      updateDoc(docRef,{
        notificationsblack:null
      }
      )
    }
    
    
    }}/>
    </Badge>
    
    
    </div>
      </PopoverTrigger>
      <PopoverContent>
  
      <br></br>
    <div className='grid h-[100px] lg:w-[400px] w-[300px] overflow-y-scroll scroll-auto rotate-180'>
   

    <div className='rotate-180 grid gap-1'>
{props.chat.map((each,index)=>{

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

<form className='h-full w-full px-10 flex gap-10'  >
  <input value={color} name="color" className='hidden' /> 
      <Textarea
      name="text"
      placeholder="Napisz wiadomość"
      className="max-w-xs text-sm h-auto"

      onChange={onChange}
value={value}
    />



<Button color="success" variant="bordered" startContent={< FaLongArrowAltRight/>}  name='button' value={props.url}

onClick={()=>{ChatAction()}}
>

      </Button>




     </form>   
      </PopoverContent>
    </Popover></>
  )
}
