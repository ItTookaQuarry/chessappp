import React, { useState, useEffect } from "react";
import { FaRegChessQueen } from "react-icons/fa6";
import Cookies, { Cookie } from "universal-cookie";

import { Progress } from "@nextui-org/react";
import {User, Link} from "@nextui-org/react";


function Stoperwhite(props) {
  const [counting, setCounting] = React.useState(20);
  const [propgressbarvalue,setprogressbarvalue]= React.useState(100)
  React.useEffect(() => {
    let interval;
    if (props.whiteleft) {
      interval = setInterval(() => {
        setCounting((prev) => {
          const toreturn = prev - 1 > 0 ? prev - 1 : 0;

          if (toreturn === 0) {
            props.setgameover("white");
          }
          return toreturn;
        });
      }, 1000);
    }
    if (!props.whiteleft) {
      clearInterval(interval);
      setCounting(20);
    }
    return () => {
      clearInterval(interval);
    };
  }, [props.whiteleft]);

  React.useEffect(() => {
    let interval;
    if (props.whiteleft) {
      interval = setInterval(() => {
        setprogressbarvalue((prev) => {
          const toreturn = prev - 1 > 0 ? prev - 1 : 0;

      
          return toreturn;
        });
      }, 200);
    }
    if (!props.whiteleft) {
      clearInterval(interval);
      setprogressbarvalue(100);
    }
    return () => {
      clearInterval(interval);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.whiteleft]);

  const cookies = new Cookies();


  if(!cookies.get("ingame")){
  

    cookies.remove("whitetime")
    cookies.remove("whitepausedtime")
  }
  const funct = () => {
    cookies.set("whitetime", elapsedTime);
    cookies.set("whitepausedtime", new Date().getTime());
  };
  window.onbeforeunload = function () {
    funct();
  };

  let time2 = Math.round(
    (new Date().getTime() - cookies.get("whitepausedtime")) / 1000
  );

  if (props.isRunning === "black") {
    time2 = 0;
  }

  const time = cookies.get("whitetime")
    ? cookies.get("whitetime") - time2-1
    : 600;

  const [elapsedTime, setElapsedTime] = React.useState(time);
  const showzero = elapsedTime % 60 < 10 ? "0" : "";














  useEffect(() => {
    let interval;

    if (props.isRunning === "white") {
      interval = setInterval(() => {
        setElapsedTime((prev) => {
          const toreturn = prev - 1 > 0 ? prev - 1 : 0;
          if (toreturn === 0) {
            props.setgameover("white");
          }
          return toreturn;
        });
      }, 1000); // Update elapsed time every 1 second
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  return (
    <div>
{props.whiteleft&&
<div className='
 m-auto
    text-rose-950 font-bold text-large rounded grid bg-black h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] 
    md:h-[100px] md:w-[100px] text-3xl grid'>
      <Progress color="danger" aria-label="Loading..." value={propgressbarvalue} />
      <div className='m-auto col-span-full row-span-full text-center'>UCIECZKA</div>
      <div className='m-auto col-span-full  text-center'>{counting}</div>
        </div>}

{!props.whiteleft &&  <>   <User   
      name={props?.srcandname?.name}
      avatarProps={{
        src:props?.srcandname?.src
      }}
    />
    
    
    
    <div
    className="
m-auto
  text-black text-large rounded grid bg-neutral-50 h-[60px] w-[60px] lg:h-[100px] lg:w-[100px] 
  md:h-[100px] md:w-[100px] text-3xl"
  >

    <div className="flex col-span-full m-auto">
      <div>{(elapsedTime - (elapsedTime % 60)) / 60} : </div>
      <div>
        {showzero}
        {elapsedTime % 60}
      </div>{" "}
    </div>

    <FaRegChessQueen
      className="col-span-full text-center m-auto text-[20px] lg:text-[30px]
  lg:text-30px"
    />
  </div>
    
  </> 
    }
  


        

    </div>
  );
}

export default Stoperwhite;
