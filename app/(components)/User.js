"use client";
import React from "react";
// import {Textarea} from "@nextui-org/react";

import { updateDoc } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import { doc } from "firebase/firestore";
import Gameinuserhistory from "../(components)/Gameinuserhistory";
import { Checkbox } from "@nextui-org/react";
import Usercard from "../(components)/Usercard";
import History from "../(components)/History";

export default function User(props) {
  const history = props.history;

  const [isSelected, setIsSelected] = React.useState(props.data.history);
  const [indextodisplay, setindextodisplay] = React.useState(null);

  function updateDocc() {
    const docRef = doc(db, "users", `${props.data.user}`);
    updateDoc(docRef, {
      history: !isSelected,
    });
  }

  React.useEffect(() => {
    return updateDocc;
  }, [isSelected]);

  return (
    <div className="grid gap-10">
      <Usercard data={props.data} />

      {indextodisplay === null && (
        <>
          <div className="flex flex-col m-auto col-span-full">
            <Checkbox isSelected={isSelected} onValueChange={setIsSelected}>
              Inni użytkownicy mogą zobaczyć twoją historię gier
            </Checkbox>
          </div>
          <History history={history} setindextodisplay={setindextodisplay} />
        </>
      )}

      {indextodisplay !== null && (
        <Gameinuserhistory
          hide={setindextodisplay}
          history={history[indextodisplay]}
        />
      )}
    </div>
  );
}
