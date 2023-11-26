import React, { useState, useEffect } from 'react';
import Cookies, { Cookie } from "universal-cookie";
import { Spinner } from "@nextui-org/react";
import { FaChessQueen } from 'react-icons/fa';
import { usePageLeave } from "@reactuses/core";
import { usePageVisibility } from "react-page-visibility";
import { Progress } from '@nextui-org/react';
import {User, Link} from "@nextui-org/react";
import { updateDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { db } from '../(firebase)/firebase';
function StoperBlack(props) {

  const docRef = doc(db,"rooms",props.url);

  const [counting, setCounting] = React.useState(20);
  const [propgressbarvalue,setprogressbarvalue]= React.useState(counting)
  React.useEffect(() => {
    let interval;
    if (props.blackleft) {
      interval = setInterval(() => {
        setCounting((prev) => {
          const toreturn = prev - 1 > 0 ? prev - 1 : 0;

          if (toreturn === 0) {
            updateDoc(docRef,{
            gameover:"black"
            }
            )
          }
          return toreturn;
        });
      }, 1000);
    }
    if (!props.blackleft) {
      clearInterval(interval);
      setCounting(20);
    }
    return () => {
      clearInterval(interval);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.blackleft]);

  React.useEffect(() => {
    let interval;
    if (props.blackleft) {
      interval = setInterval(() => {
        setprogressbarvalue((prev) => {
          const toreturn = prev - 1 > 0 ? prev - 1 : 0;

      
          return toreturn;
        });
      }, 200);
    }
    if (!props.blackleft) {
      clearInterval(interval);
      setprogressbarvalue(100);
    }
    return () => {
      clearInterval(interval);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.blackleft]);

  const cookies = new Cookies();
  const funct= ()=>{
cookies.set("blacktime",elapsedTime)
cookies.set("blackpausedattime", new Date().getTime())
  }
  if(!cookies.get("ingame")){
    cookies.remove("blacktime")
    cookies.remove("blackpausedtime")
  }



  window.onbeforeunload = function() {
    funct()
}


const time2= Math.round((new Date().getTime()-cookies.get("blackpausedattime"))/1000)



const time = cookies.get("blacktime") ? cookies.get("blacktime")-time2-1  : 600 





  const [elapsedTime, setElapsedTime] = React.useState(time);
const showzero= elapsedTime%60<10 ? "0" : ""

  useEffect(() => {
    let interval;

    if (props.isRunning==="black") {
      interval = setInterval(() => {
        setElapsedTime((prev)=>{
        const toreturn = prev-1 >0 ? prev-1 : 0 
        return toreturn
        }
          
          
          );
      }, 1000); // Update elapsed time every 1 second
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [props]);

 
  return (
    <div>




{!props.blackleft&& <>  <User   
  name={props?.srcandname?.name}
  avatarProps={{
    src:props?.srcandname?.src
  }}
/>     <div className='
 m-auto
    text-black text-large rounded grid bg-neutral-50 h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] 
    md:h-[100px] md:w-[100px] text-3xl'>
  <div className='flex col-span-full m-auto'>
  <div>{(elapsedTime-elapsedTime%60)/60} : </div> 
  <div>{showzero}{elapsedTime%60}</div> </div>

  <FaChessQueen className='col-span-full text-center m-auto  text-[20px] lg:text-[30px]' />
    </div> 
</>}
  {props.blackleft &&    <div className='
 m-auto
    text-rose-950 font-bold text-large rounded grid bg-black h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] 
    md:h-[100px] md:w-[100px] text-3xl grid'>
      <Progress color="danger" aria-label="Loading..." value={propgressbarvalue} />
      <div className='m-auto col-span-full row-span-full text-center'>UCIECZKA</div>
      <div className='m-auto col-span-full  text-center'>{counting}</div>
        </div> }

      


    </div>
  );
}

export default StoperBlack;