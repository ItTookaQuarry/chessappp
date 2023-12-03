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

import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
export default function Dropdownclient(props) {
  let invites = props.invites === undefined ? [] : props.invites;

  let notes = props.nots === 0 ? undefined : props.nots;

  let friends = props.friends === undefined ? [] : props.friends;

  const [invitesstate, setinvitesstate] = React.useState(invites);

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
          return each !== invited;
        }),
      },
    });

    if (invitedData?.notifications?.invitesusers.includes(invites)) {
      let inv =
        invitedData?.notifications?.invites - 1 < 0
          ? 0
          : invitedData?.notifications?.invites - 1;

      updateDoc(invitedRef, {
        notifications: {
          invites: inv,
          invitesusers: invitedData?.notifications?.invitesusers.filter(
            (each) => {
              return each !== invites;
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

    const friendstoreturn =
      inviteddatafriends === undefined
        ? [invites]
        : [...inviteddatafriends, invites];

    const invitesfriends = invitesData?.friends;

    const friendstoreturn2 =
      invitesfriends === undefined ? [invited] : [...invitesfriends, invited];

    updateDoc(invitesRef, {
      connections: {
        invited: inviteddatainvites.filter((each) => {
          return each !== invited;
        }),
      },
      friends: friendstoreturn2,
    });

    if (invitedData?.notifications?.invitesusers.includes(invites)) {
      let inv =
        invitedData?.notifications?.invites - 1 < 0
          ? 0
          : invitedData?.notifications?.invites - 1;

      updateDoc(invitedRef, {
        notifications: {
          invites: inv,
          invitesusers: invitedData?.notifications?.invitesusers.filter(
            (each) => {
              return each !== invites;
            }
          ),
        },
        friends: friendstoreturn,
      });
    }
  }

  const pathname = usePathname();

  const [notsstate, setnotesstae] = React.useState(notes);

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
                    invitesusers: props.invites.map((each) => {
                      return each.id;
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
          {!invitesstate.length && (
            <DropdownItem>Brak powiadomień</DropdownItem>
          )}

          {invitesstate.map((each, index) => {
            return (
              <DropdownItem  key={index}>
                <div className="grid gap-2">
                  <div className="flex gap-1 row-start-1 row-span-1">
                    <img
                      src={each.userphoto}
                      className="h-[20px] w-[20px] rounded-full"
                    />
                    <p>{each.label} Zaprasza Cię</p>
                  </div>

                  <div className="flex gap-1 row-start-2 row-span-2">
                    <Button
                      onClick={() => {
                        addtofriends(index, each.value, true);
                      }}
                      type="submit"
                      name={"sendinv"}
                      value={each.value}
                      color="success"
                      className="h-[20px] w-[10px]"
                      endContent={<IoMdPersonAdd />}
                    ></Button>

                    <Button
                      onClick={() => {
                        addinvitestable(index, each.value, false);
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
      <Dropdown>
        <DropdownTrigger>
          <div className="grid">
            <div className="col-span-full row-span-full m-auto text-center">
              <Badge content={props.nots} color="primary">
                {" "}
                <BsChatSquare size={"1.5em"} />
              </Badge>
            </div>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions ">
          {friends.length === 0 && <DropdownItem >Brak czatów </DropdownItem>}

          {friends.length > 0 &&
            friends.map((each, index) => {
              return (
                <DropdownItem key={index}>
                  <div className="grid gap-2">
                    <div className="flex gap-1 row-start-1 row-span-1">
                      <img
                        src={each.userphoto}
                        className="h-[20px] w-[20px] rounded-full"
                      />
                      <p>{each.label}</p>
                    </div>
                  </div>
                </DropdownItem>
              );
            })}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
