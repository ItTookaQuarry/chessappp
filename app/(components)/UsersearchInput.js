"use client"

import React from 'react'
import { Input } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';
export default function UsersearchInput(props) {

const data = props.data
const cookie = props.cookie













 
//qwes
  return (
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
  
    <Autocomplete
   
      placeholder="Szukaj innych użytkowników"
      className="max-w-xs"
      defaultItems={data}
    >
      {(item) =>{    
const link = cookie === item.key ? "/account" : `/user?user=${item.key}`
        return (
          <AutocompleteItem key={item.key} 




          startContent={<Avatar alt="user" className="w-6 h-6" src={item.userphoto}/>}
          
                
                href={link}      >
          
                  {item.label}
                  
                  
                  </AutocompleteItem>
        )
      }}
    </Autocomplete>
  </div>
  )
}
