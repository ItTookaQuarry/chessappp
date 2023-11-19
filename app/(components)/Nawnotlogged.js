"use client"
import React from "react";
import {
  Navbar,
  NavbarBrand,
NavbarMenu,
  NavbarItem,
  NavbarMenuToggle,
  NavbarContent,
  NavbarMenuItem
} from "@nextui-org/react";
import {Link} from "@nextui-org/react";
import Auth from "./Auth";
export default function Nawnotlogged() {


  const [isMenuOpen, setIsMenuOpen] = React.useState(false);





  const menuItems = [
   {name: "Menu Główne",link:"/"},
   {name: "Pokoje do gry" ,link:"rooms"},
  ];


  return (
    <Navbar>
   <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
      <NavbarContent className="hidden sm:flex gap-4" justify="center">



        <NavbarItem>

        <Link href="/" underline="none">Menu Głowne</Link>

</NavbarItem>
       
        <NavbarItem>

        <Link href="rooms" underline="none">Pokoje do gry</Link>

</NavbarItem>



      </NavbarContent>

     
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className="w-full text-5xl"
              href={item.link}
              
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>





      <Auth/>
    </Navbar>
  );
}
