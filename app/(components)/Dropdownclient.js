"use client";
import React from "react";
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import { Avatar, Badge } from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChatSquare } from "react-icons/bs";
import SignOut from "./SignOut";
import { db } from "../(firebase)/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { IoMdPersonAdd } from "react-icons/io";
import { HiOutlineUserRemove } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
export default function Dropdownclient(props) {

let notsstate = props.notsstate
let setnotesstae = props.setnotesstae
let invitesstate= props.invitesstate

let setinvitesstate=props.setinvitesstate 
let friends = props.friends




  async function addinvitestable(index, value, bull) {
    setinvitesstate((prev) => {
      return prev.filter((each, i) => {
        return i !== index;
      });
    });

    const invited = props.email;

    const invites = value;

    const invitedRef = doc(db, "users", invited);
    const invitesRef = doc(db, "users", invites);
    let invitedData = await getDoc(invitedRef);
    invitedData = invitedData.data();
    let invitesData = await getDoc(invitesRef);
    invitesData = invitesData.data();

    const inviteddatainvites = invitesData?.connections?.invited;

    updateDoc(invitesRef, {
      connections: {
        invited: inviteddatainvites.filter((each) => {
          return each.email !== invited;
        }),
      },
    });

    if (
      invitedData?.notifications?.invitesusers
        .map((each) => {
          return each.email;
        })
        .includes(invites)
    ) {
      let inv =
        invitedData?.notifications?.invites - 1 < 0
          ? 0
          : invitedData?.notifications?.invites - 1;

      updateDoc(invitedRef, {
        notifications: {
          invites: inv,
          invitesusers: invitedData?.notifications?.invitesusers.filter(
            (each) => {
              return each.email !== invites;
            }
          ),
        },
      });
    }
  }

  async function addtofriends(index, value, bull) {
    setinvitesstate((prev) => {
      return prev.filter((each, i) => {
        return i !== index;
      });
    });

    const invited = props.email;

    const invites = value;

    const invitedRef = doc(db, "users", invited);
    const invitesRef = doc(db, "users", invites);
    let invitedData = await getDoc(invitedRef);
    invitedData = invitedData.data();
    let invitesData = await getDoc(invitesRef);
    invitesData = invitesData.data();

    const inviteddatainvites = invitesData?.connections?.invited;

    const inviteddatafriends = invitedData?.friends;
    if (
      inviteddatafriends
        ?.map((each) => {
          return each.friend.email;
        })
        ?.includes(invites)
    ) {

      let inv =
      invitedData?.notifications?.invites - 1 < 0
        ? 0
        : invitedData?.notifications?.invites - 1;




      updateDoc(invitesRef, {
        connections: {
          invited: inviteddatainvites.filter((each) => {
            return each.email !== invited;
          }),
        },
      });

      updateDoc(invitedRef, {
        notifications: {
          invites: inv,
          invitesusers: invitedData?.notifications?.invitesusers.filter(
            (each) => {
              return each.email !== invites;
            }
          ),
        },
      });


      return 

    }

    const id = uuidv4();

    let invitedobj = {
      email: invitedData.user,
      src: invitedData.photoURL,
      name: invitedData.displayName,
    };

    let invitesobj = {
      email: invitesData.user,
      src: invitesData.photoURL,
      name: invitesData.displayName,
    };

    const friendstoreturn =
      inviteddatafriends === undefined
        ? [{ friend: invitesobj, chatromm: id }]
        : [...inviteddatafriends, { friend: invitesobj, chatromm: id }];

    const invitesfriends = invitesData?.friends;

    const friendstoreturn2 =
      invitesfriends === undefined
        ? [{ friend: invitedobj, chatromm: id }]
        : [...invitesfriends, { friend: invitedobj, chatromm: id }];

    updateDoc(invitesRef, {
      connections: {
        invited: inviteddatainvites.filter((each) => {
          return each.email !== invited;
        }),
      },
      friends: friendstoreturn2,
    });

    if (
      invitedData?.notifications?.invitesusers
        .map((each) => {
          return each.email;
        })
        .includes(invites)
    ) {
      let inv =
        invitedData?.notifications?.invites - 1 < 0
          ? 0
          : invitedData?.notifications?.invites - 1;

      updateDoc(invitedRef, {
        notifications: {
          invites: inv,
          invitesusers: invitedData?.notifications?.invitesusers.filter(
            (each) => {
              return each.email !== invites;
            }
          ),
        },
        friends: friendstoreturn,
      });
    }

    let chatid = id;

    const chatsref = doc(db, "chats", chatid);
    const chatSnap = await getDoc(chatsref);

    if (!chatSnap.exists()) {
      setDoc(chatsref, {
        access: [invited, invites],
        chat: ["First msg"],
      });
    }
  }

  const pathname = usePathname();

  
  if (props.src) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            as="button"
            className="transition-transform"
            color="secondary"
            size="sm"
            src={props.src}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions w-[400px]">
          <DropdownItem
            key="profile"
            className="h-14 gap-2 w-auto"
            href="/account"
          >
            <div> Twoje konto</div>
          </DropdownItem>

          <DropdownItem key="Wyloguj" className="h-14 gap-2 w-auto">
            <SignOut />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
  }
  if (props.name === "nots") {
    return (
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger
          onClick={async () => {
            if (notsstate > 0) {
              setnotesstae(undefined);
              if (props.email !== undefined) {
                const docref = doc(db, "users", props.email);

                updateDoc(docref, {
                  notifications: {
                    invitesusers: invitesstate?.map((each) => {
                      return each;
                    }),
                    invites: 0,
                  },
                });
              }
            }
          }}
        >
          <div className="grid">
            <div className="col-span-full row-span-full m-auto text-center">
              <Badge content={notsstate} color="primary">
                {" "}
                <IoMdNotificationsOutline size={"2em"} />
              </Badge>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions ">
          {!invitesstate?.length && (
            <DropdownItem>Brak powiadomień</DropdownItem>
          )}

          {invitesstate?.map((each, index) => {
            return (
              <DropdownItem key={index}>
                <div className="grid gap-2">
                  <div className="flex gap-1 row-start-1 row-span-1">
                    <img
                      src={each.src}
                      className="h-[20px] w-[20px] rounded-full"
                    />
                    <p>{each.name} Zaprasza Cię</p>
                  </div>

                  <div className="flex gap-1 row-start-2 row-span-2">
                    <Button
                      onClick={() => {
                        addtofriends(index, each.email, true);
                      }}
                      type="submit"
                      name={"sendinv"}
                      color="success"
                      className="h-[20px] w-[10px]"
                      endContent={<IoMdPersonAdd />}
                    ></Button>

                    <Button
                      onClick={() => {
                        addinvitestable(index, each.email, false);
                      }}
                      name={"sendinv"}
                      value={each.value}
                      type="submit"
                      color="danger"
                      className="h-[20px] w-[10px]"
                      endContent={<HiOutlineUserRemove />}
                    ></Button>
                    <input className="hidden" name="path" value={pathname} />
                  </div>
                </div>
              </DropdownItem>
            );
          })}
        </DropdownMenu>
      </Dropdown>
    );
  }

  if (props.name === "msg") {
    return (
      <Dropdown closeOnSelect={false}>
        <DropdownTrigger>
          <div className="grid">
            <div className="col-span-full row-span-full m-auto text-center">
              {props.msgs === undefined ||
                (props.msgs < 1 && <BsChatSquare size={"1.5em"} />)}

              {props.msgs >= 1 && (
                <Badge content={props.msgs} color="primary">
                  <BsChatSquare size={"1.5em"} />
                </Badge>
              )}
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions ">
          {friends.length === 0 && <DropdownItem>Brak czatów </DropdownItem>}

          {friends.length > 0 &&
            friends.map((each, index) => {
              return (
                <DropdownItem key={index} href={`/chat?chat=${each.chatromm}`}>
                  {!each.nots && (
                    <div className="flex gap-1 ">
                      <img
                        src={each.friend.src}
                        className="h-[40px] w-[40px] rounded-full"
                      />
                      <p>{each.friend.name}</p>
                    </div>
                  )}

                  {each.nots > 0 && (
                    <div className="flex gap-1 ">
                      <img
                        src={each.friend.src}
                        className="h-[40px] w-[40px] rounded-full"
                      />
                      <br></br>
                      <Badge
                        content={each.nots}
                        color="primary"
                        className="mt-2"
                      >
                        <div></div>{" "}
                      </Badge>
                      <p className="mt-5">{each.friend.name}</p>
                    </div>
                  )}
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
