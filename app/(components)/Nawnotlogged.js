"use client"
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
    


  

} from "@nextui-org/react";

import Auth from "./Auth";
export default function Nawnotlogged() {






  return (
    <Navbar>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>

        <Auth/>
     
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page" color="secondary">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>

     
    </Navbar>
  );
}
