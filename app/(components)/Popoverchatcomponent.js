import React from 'react'
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";
import { CiChat2 } from "react-icons/ci";
import {Badge, Avatar} from "@nextui-org/react";
import { Textarea } from '@nextui-org/react';
import { ChatAction } from '../actions';
import { FaLongArrowAltRight } from "react-icons/fa";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../(firebase)/firebase';
export default function Popoverchatcomponent(props) {
const color = props.color === "white" ? "black" : "white"

const [opened,setopened]=React.useState()


React.useEffect(()=>{

},[])



  return (<>
    <Popover placement='right'
    className="lg:w-[400px] w-[300px]"
    disableAnimation={true}
    onOpenChange={()=>{setopened((prev)=>{!prev})}}
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

    <div className='grid h-[100px] lg:w-[400px] w-[300px] overflow-y-scroll scroll-auto rotate-180'>
   

    <div className='rotate-180 grid gap-1'>
{props.chat.map((each)=>{

  return (    <div className='flex gap-2'>
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

<form className='h-full w-full px-10 flex gap-10' action={ChatAction} >
  <input value={color} name="color" className='hidden' /> 
      <Textarea
      name="text"
      placeholder="Napisz wiadomość"
      className="max-w-xs text-sm h-auto"
    />



<Button color="success" variant="bordered" startContent={< FaLongArrowAltRight/>} type='Submit' name='button' value={props.url}>

      </Button>




     </form>   
      </PopoverContent>
      <div>`${opened}`12123</div>
    </Popover></>
  )
}
