"use client";
import Link from "next/link";
import React from "react";
import Room from "./Room";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FaChessBishop, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import Cookies, { Cookie } from "universal-cookie";
export default function Roomsclient(props) {
  const router = useRouter();  
  const cookies = new Cookies();



  const ingame= cookies.get("ingame")

  const addDocumentwithredirect = async (color) => {

    if(!ingame){
    const id = uuidv4();

    await setDoc(doc(db, "rooms", id), {
      black: false,
      white: false,
    });
    router.push(`${id}?color=${color}`);}
  };






  return (
  
    <div className="grid  w-screen relative h-1/2 gap-10">
      <div className="m-auto  col-span-full mt-10">
        <Dropdown className="m-auto ">
          <DropdownTrigger>
            <Button variant="solid">Stwórz Pokój do gry</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions ">
            <DropdownItem
              key="new"
              onClick={() => {
                addDocumentwithredirect("black");
              }}
            >
              Graj jako czarne
            </DropdownItem>
            <DropdownItem
              key="copy"
              onClick={() => {
                addDocumentwithredirect("white");
              }}
            >
              Graj jako białe
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="grid col-span-full m-auto  w-full h-full gap-10">
        {props.data
          .filter((each) => {
            const data = each.data();
            let bull = data.white && data.black;
            return !bull;
          })
          .map((each, index) => {
            return <Room data={each} index={index} key={index} ingame={ingame}/>;
          })}
      </div>
    </div>
  );
}
