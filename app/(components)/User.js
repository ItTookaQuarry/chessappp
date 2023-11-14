"use client"
import React from 'react'
import {Image} from "@nextui-org/react";
import {Textarea} from "@nextui-org/react";
export default function User(props) {
  return (
    <div className='grid h-screen w-screen grid-cols-8'>
  
  <div className='col-start-4 col-span-2  m-auto'>
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
    />

  </div>
  )
}
