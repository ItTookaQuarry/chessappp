import React from "react";
import {
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import { Avatar,Badge } from "@nextui-org/react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChatSquare } from "react-icons/bs";
import SignOut from "./SignOut";
export default function Dropdownclient(props) {
  if (props.src) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            isBordered
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
  if (props.src === false && !props.nots) {
    return (
      <Dropdown>
        <DropdownTrigger>
          <div className="grid">
            <div className="col-span-full row-span-full m-auto text-center">
            <Badge  content="5" color="primary"> <IoMdNotificationsOutline   size={"1.5em"} /></Badge>
            </div>

          </div>




        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions ">
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

  if (props.nots) {
    return (
      <Dropdown>
        <DropdownTrigger>
        <div className="grid">
            <div className="col-span-full row-span-full m-auto text-center">
            <Badge  content="5" color="primary"> <BsChatSquare  size={"1.5em"} /></Badge>
            </div>

          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions ">
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
}
