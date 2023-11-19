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
  NavbarMenuToggle,
  DropdownMenu,
  NavbarMenuItem,
  NavbarMenu,
  input
} from "@nextui-org/react";
import { Avatar } from "@nextui-org/avatar";
import SignOut from "./SignOut";
import UsersearchInput from "./UsersearchInput";


import { auth } from "../(firebase)/firebase";

import Cookies, { Cookie } from "universal-cookie";
import { Spinner } from "@nextui-org/react";
export default function Nawlogged(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const cookies = new Cookies();


const data=props.usersdata

const cookie=props.cookie





  const menuItems = [
    {name: "Menu Główne",link:"/"},
    {name: "Pokoje do gry" ,link:"rooms"},
   ];
 


  const [src, setsrc] = React.useState("a");

  React.useEffect(() => {
    setsrc(cookies.get("src"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Navbar>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="rooms" underline="none">
            Pokoje do gry
          </Link>
        </NavbarItem>

        <NavbarItem>
          <Link href="rooms" underline="none">
            Menu Główne
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          {src === "a" && (
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <Spinner />
            </NavbarContent>
          )}
          {src !== "a" && (
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src={src}
              />
            </DropdownTrigger>
          )}

          <DropdownMenu aria-label="Profile Actions" variant="flat">
        


            <DropdownItem key="profile" className="h-14 gap-2" href="account">
             <div >  Twoje konto</div> 
            </DropdownItem>
        



            <DropdownItem key="Wyloguj" className="h-14 gap-2">
              <SignOut />
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      <NavbarItem>
     <UsersearchInput  data={data}  cookie={cookie}/>


      </NavbarItem>



      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-5xl"
              href={item.link}
              
            >
              {item.name}
            </Link>
          </NavbarMenuItem >
        ))}
      </NavbarMenu>

    </Navbar>
  );
}
