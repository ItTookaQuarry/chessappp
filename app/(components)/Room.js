"use client"
import { FaChess } from 'react-icons/fa'
import Link from 'next/link'
import React from 'react'
export default function Room(props) {




const data= props.data.data()

let msg=""
if(!data.white&&!data.black){
  msg="Wybierz Kolor"
}
if(data.white&&!data.black){
  msg="Graj jako czarne"
}

if(!data.white&&data.black){
  msg="Graj jako białe"
}

if(data.white&&data.black){
  msg="Pełny"
}



  return (<div className='grid col-span-full  lg:flex gap-5 m-auto'>

  

<div key={props.data.id} ><div className='h-[100px] m-auto  text-lg rounded-lg w-[200px] inline-block  text-lg rounded bg-neutral-800 px-6 pb-2 pt-2.5 text-xl  '>
    {`Pokój numer ${props.index+1}`}
    <strong><div>{msg}</div></strong>
    </div></div> 
    
    <div className='flex  gap-1 m-auto '>
 {!data.white &&  <Link href={`${props.data.id}?color=white`}> <div key={props.data.id} ><div className='h-[100px]  w-[100px] rounded-full bg-black grid'>
   <FaChess color='white' className='text-[40px] col-span-full row-span-full m-auto ' />

    </div></div> </Link> }




  {!data.black && <Link href={`${props.data.id}?color=black`}> <div key={props.data.id} ><div className='h-[100px]  w-[100px] rounded-full bg-black grid'>
   <FaChess color='brown' className='text-[40px] col-span-full row-span-full m-auto ' />
    </div></div></Link> }
    
    </div>
    
    </div>
  )
}
