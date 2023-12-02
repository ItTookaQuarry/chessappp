"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarItem,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem,
} from "@nextui-org/react";
import Dropdownclient from "./Dropdownclient";
import SignOut from "./SignOut";
import { Link } from "@nextui-org/react";
import Auth from "./Auth";
import { Avatar } from "@nextui-org/react";
import UsersearchInput from "./UsersearchInput";

export default function Nawnotlogged(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const data = props.data;
  const src = props?.user?.imageUrl;
  const user = props.user;

  const email = user.emailAddresses[0]?.emailAddress;
  const menuItems = [
    { name: "Menu Główne", link: "/" },
    { name: "Pokoje do gry", link: "rooms" },
  ];

  return (
    <>
      <Navbar>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link href="/" underline="none">
              Menu Głowne
            </Link>
          </NavbarItem>

          <NavbarItem>
            <Link href="rooms" underline="none">
              Pokoje do gry
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.name}-${index}`}>
              <Link className="w-full text-5xl" href={item.link}>
                {item.name}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        {props.user === null && <Auth />}

        {props.user !== null && (
          <>
            <NavbarItem className="flex gap-5">
              <Dropdownclient src={src} />
              <Dropdownclient
                src={false}
                nots={props.nots}
                invites={props.invites}
                name={"nots"}
                email={props.user.emailAddresses[0].emailAddress}
              />
              <Dropdownclient src={false} name={"msg"} friends={props.friends} />
            </NavbarItem>
            <NavbarItem>
              <UsersearchInput
                data={data}
                cookie={user?.emailAddresses[0]?.emailAddress}
              />
            </NavbarItem>
          </>
        )}
      </Navbar>
    </>
  );
}
