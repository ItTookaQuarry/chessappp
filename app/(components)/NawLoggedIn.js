"use client"
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


export default  function Naw() {
  const user =  auth.currentUser;
  console.log(auth.currentUser)
  console.log(user?.photoURL)
  return (
    <Navbar>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        
         
      <SignOut/>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              src={`${user?.photoURL}`}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
           
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
