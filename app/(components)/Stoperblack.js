import React, { useState, useEffect } from 'react';
import Cookies, { Cookie } from "universal-cookie";
import { Spinner } from "@nextui-org/react";
import { FaChessQueen } from 'react-icons/fa';
function StoperBlack(props) {
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
  }, [props.isRunning]);

 
  return (
    <div className='
 m-auto
    text-black text-large rounded grid bg-neutral-50 h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] 
    md:h-[100px] md:w-[100px] text-3xl'>
  <div className='flex col-span-full m-auto'>
  <div>{(elapsedTime-elapsedTime%60)/60} : </div> 
  <div>{showzero}{elapsedTime%60}</div> </div>

  <FaChessQueen className='col-span-full text-center m-auto  text-[20px] lg:text-[30px]' />
    </div>
  );
}

export default StoperBlack;