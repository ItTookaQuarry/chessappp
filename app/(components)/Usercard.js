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
          <p className="text-md text-default-500">{props?.data?.user}</p>
        </div>

        {props.withoutform && (
          <Button
            color="primary"
            variant="ghost"
            startContent={<IoPersonAdd />}
          >
            <p className="hidden lg:block ">Dodaj do znajomych</p>
          </Button>
        )}
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
