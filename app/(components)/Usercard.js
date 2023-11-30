"use client";

import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { myAction } from "../actions";
import { Textarea } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { Image } from "@nextui-org/react";
import { IoPersonAdd } from "react-icons/io5";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../(firebase)/firebase";
import { collection } from "firebase/firestore";
import { addtofriends } from "../actions";
import { Spinner } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";
import { deleteinvite } from "../actions";

export default function Usercard(props) {
 









  return (
    <Card className=" max-w-[400px] lg:max-w-[650px] col-span-full m-auto ">
      <CardHeader className="flex gap-3 ">
        <Image
          alt="nextui logo"
          height={60}
          radius="sm"
          src={props?.data?.photoURL}
          width={200}
        />
        <div className="flex flex-col">
          <h1 className="text-lg">{props?.data?.displayName}</h1>
    
        </div>

        {props.withoutform && !props.status &&(
          <form action={addtofriends} >
          <Button
     type="submit"
                color="primary"
            variant="ghost"
            startContent={<IoPersonAdd />}
            name={"invited"} value={props.user}
   
          >
            <p className="hidden lg:block " 
            >Dodaj do znajomych</p>
          </Button></form>

        )}

        {props.status==="invited"&&
        
        
        <form action={deleteinvite} >
        <Button
           
   type="submit"
          color="primary"
          variant="ghost"
          endContent={<FaTrash />}
          startContent={<Spinner/>}
          name={"invited"} value={props.user}
 
        >
          <p className="hidden lg:block " 
          >Usuń zaproszenie</p>
        </Button></form>
        
      //   <div className="grid"><Spinner
      // /><p className="text-cyan-700 text-xs"> Zaproszono</p>  </div>
      
      
      
      
      
      
      
      
      
      
      
      
      }
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{props?.data?.Description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        {!props.withoutform && (
          <form className="m-auto flex gap-10" action={myAction} method="POST">
            {/* <input type="text" name="name" value={123}/> */}

            <Textarea name="desciption" />
            <div>
              {" "}
              <br></br>
            </div>
            <Button
              color="danger"
              variant="bordered"
              startContent={<FaRegEdit />}
              type="submit"
            ></Button>
          </form>
        )}
      </CardFooter>
    </Card>
  );
}
