"use client";

import React from "react";
import { IoPersonAdd } from "react-icons/io5";
import { addtofriends } from "../actions";
import { Spinner, user } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { deleteinvite } from "../actions";
import { FaUserFriends } from "react-icons/fa";
import { Button } from "@nextui-org/react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
export default function Status(props) {
  const [status, setstatus] = React.useState(props.status);

  React.useEffect(() => {

    const update = () => {
      onSnapshot(doc(db, "users", props.user), (doc) => {
        const data = doc.data();

        let statuschange = status;
        if (
          data?.notifications?.invitesusers &&
          data?.notifications?.invitesusers
            .map((each) => {
              return each?.email;
            })
            .includes(props?.email)
        ) {
          statuschange = "invited";
        }

        if (
          data?.friends &&
          data?.friends
            .map((each) => {
              return each?.friend?.email;
            })
            .includes(props?.email)
        ) {
          statuschange = "friends";
        }


    



          setstatus(statuschange);
    
      });
    };

    return update();
  }, []);

  return (
    <>
      {props.withoutform && !status && (
        <form action={addtofriends}>
          <Button
            type="submit"
            color="primary"
            variant="ghost"
            startContent={<IoPersonAdd />}
            name={"invited"}
            value={props.user}
          >
            <p className="hidden lg:block ">Dodaj do znajomych</p>
          </Button>
        </form>
      )}

      {status === "invited" && (
        <form action={deleteinvite}>
          <Button
            type="submit"
            color="primary"
            variant="ghost"
            endContent={<FaTrash />}
            startContent={<Spinner />}
            name={"invited"}
            value={props.user}
          >
            <p className="hidden lg:block ">Usuń zaproszenie</p>
          </Button>
        </form>
      )}

      {status === "friends" && (
        <Button
          isDisabled={true}
          type="submit"
          color="primary"
          variant="ghost"
          name={"invited"}
          value={props.user}
          startContent={<FaUserFriends />}
        >
          <p className="hidden lg:block ">Znajomi</p>
        </Button>
      )}
    </>
  );
}
