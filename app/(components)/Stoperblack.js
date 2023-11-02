import React, { useState, useEffect } from 'react';

function StoperBlack(props) {


  const [elapsedTime, setElapsedTime] = React.useState(600);

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
    m-auto row-start-1 row-span-2
    text-black text-large rounded grid bg-neutral-50 h-[100px] w-[100px] text-3xl'>
  
  <div className='flex col-span-full m-auto'>
  <div>{(elapsedTime-elapsedTime%60)/60} : </div> 
  <div>{showzero}{elapsedTime%60}</div> </div>
    </div>
  );
}

export default StoperBlack;