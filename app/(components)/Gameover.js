import React from 'react'
import Link from 'next/link'
import { Button } from '@nextui-org/react'
export default function Gameover(props) {
  return (


 
   <Button
    
              variant="bordered"
          className="
absolute
lg:h-[200px]
lg:w-[600px]
m-auto
 bg-black
right-0
left-0
lg:text-2xl
h-[200px]
w-[400px]
text-lg
      mt-50 grid"
          
            >
              <div className='grid col-span-full row-span-full m-auto'>
              <div>{props.msg}</div>
              <div className='text-sm lg:text-lg md:text-md'>Za chwilę zostaniesz przekierowany do pokoi do gry</div>
              </div>
 </Button>)
}
