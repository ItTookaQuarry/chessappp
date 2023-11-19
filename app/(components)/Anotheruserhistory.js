"use client"

import React from "react";
import Gameinuserhistory from "./Gameinuserhistory";
import History from "./History";
export default function Anotheruserhistory(props) {
  const [indextodisplay, setindextodisplay] = React.useState(null);

let history=props.history


  return (


    <>
      {indextodisplay === null && (
        <History history={history} setindextodisplay={setindextodisplay} />
      )}


{indextodisplay !== null && (
    <div className="absolute mt-20 ">
        <Gameinuserhistory 
        hide={setindextodisplay}
        history={history[indextodisplay]}  /></div>
      )}



</>
  );
}
