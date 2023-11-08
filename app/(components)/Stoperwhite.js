import React, { useState, useEffect } from "react";
import { FaRegChessQueen } from "react-icons/fa6";
import Cookies, { Cookie } from "universal-cookie";
function Stoperwhite(props) {






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
            props.setgameover(true);
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
  }, [props]);

  return (
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
  );
}

export default Stoperwhite;
