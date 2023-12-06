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
import { Link } from "@nextui-org/react";
import Auth from "./Auth";
import UsersearchInput from "./UsersearchInput";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { currentUser } from "@clerk/nextjs";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import { updateDoc } from "firebase/firestore";
import Cookies from 'universal-cookie';
export default function Nawnotlogged(props) {
  const cookies = new Cookies();

  if(props.paramscchat){

    cookies.set("id",props.paramscchat)
  }


  if(props?.paramscchat===undefined && cookies.get("id")){
    cookies.remove("id")
  }

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const data = props.data;
  const src = props?.user?.imageUrl;
  const user = props.user;

  const email = user?.emailAddresses[0]?.emailAddress;

  const [invitesstate, setinvitesstate] = React.useState(
    props.invites === undefined ? [] : props.invites
  );

  const [notsstate, setnotesstae] = React.useState(
    props.nots === 0 ? undefined : props.nots
  );

  const [friendstate, setfriends] = React.useState(
    props.friends === undefined ? [] : props.friends
  );

  const [msgs, setmsgs] = React.useState(props.msgnots);




  React.useEffect(async () => {
    onSnapshot(
      doc(db, "users", `${props.user?.emailAddresses[0]?.emailAddress}`),
      (doc) => {
        const data = doc.data();
        if (data.notifications?.invites !== 0) {
          setnotesstae(data.notifications?.invites);
        }

        setinvitesstate(data.notifications?.invitesusers);
        setfriends(data.friends);

        let msgnots = 0;
        let friendss = [...data.friends];

        if (friendss !== undefined) {
          [...data?.friends].map((each, index) => {


            if (
              each.nots !== undefined &&
              each?.chatromm !== props.paramscchat
            ) {
              msgnots = msgnots + each?.nots;
            }
          });

          if (msgnots !== msgs) {
            setmsgs(msgnots);
          }
        }
      }
    );
  }, []);

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
                notsstate={notsstate}
                setnotesstae={setnotesstae}
                invitesstate={invitesstate}
                setinvitesstate={setinvitesstate}
                name={"nots"}
                email={email}
                friends={friendstate}
              />
              <Dropdownclient
                name={"msg"}
                friends={friendstate}
                msgs={msgs}
                email={props.user.emailAddresses[0].emailAddress}
              />
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
