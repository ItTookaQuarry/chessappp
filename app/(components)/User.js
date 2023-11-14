"use client"
import React from 'react'
import {Image} from "@nextui-org/react";
// import {Textarea} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { Divider } from '@nextui-org/divider';
import {Textarea} from "@nextui-org/react";
export default function User(props) {
  return (
    <div >
  
  {/* <div className='col-start-4 col-span-2  m-auto'>
    <Image
    width={250}
    alt="NextUI hero Image"
    src={props.data.photoURL}

    
  /></div>
  <div className='col-start-1 col-span-2 m-auto row-span-full'>
  <h1>{props.data.displayName}</h1>
  <h2>{props.data.user}</h2>
  </div>
  <Textarea
      label="Description"
      placeholder=""
      className="max-w-xs"
    /> */}
 <Card className="max-w-[600px]">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src={props.data.photoURL}
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{props.data.displayName}</p>
          <p className="text-small text-default-500">{props.data.user}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
      <Textarea
      label="Description"
      placeholder="Enter your description"
      className="max-w-xs"
    />
      </CardBody>
      <Divider/>
      <CardFooter>
        
      </CardFooter>
    </Card>
  </div>
  )
}
