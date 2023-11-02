"use client"
import Link from 'next/link'
import React from 'react'
import Room from "./Room" ;
export default function Roomsclient(props) {





  return (
    <div className='grid  w-screen relative' >
    <div className='grid col-span-full m-auto lg:h-2/3 w-full h-full gap-10'>{props.data.map((each,index)=>{
        return (
           <Room data={each} index={index} key={index} />
        )
    })}</div></div>
  )
}
