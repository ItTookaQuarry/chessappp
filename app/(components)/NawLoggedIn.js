"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import SignOut from "./SignOut";
import { auth } from "../(firebase)/firebase";
import Cookies, { Cookie } from "universal-cookie";
import {Spinner} from "@nextui-org/react";
export default function Naw() {
  const user = auth.currentUser;
  const cookies = new Cookies();

  const email = cookies.get("email");

  const [src, setsrc] = React.useState("a");

  React.useEffect(() => {
    setsrc(cookies.get("src"));
  }, []);

  return (
    <Navbar>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <SignOut />
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          {src==="a"&&
             <NavbarContent className="hidden sm:flex gap-4" justify="center">
             <Spinner/>
           </NavbarContent>}
        {src!=="a"&&<DropdownTrigger>
        <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src={src}
            />
          </DropdownTrigger>}
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{email}</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
