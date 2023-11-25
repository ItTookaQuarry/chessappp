import React from 'react'
import GameClientComponent from "../(components)/GameClientComponent";
import { currentUser } from '@clerk/nextjs'
import Nawbar from '../(components)/Nawbar';
export default async  function page() {
  const user = await currentUser();
const email= user.emailAddresses[0].emailAddress
const src= user.imageUrl
const  displayName =`${user.firstName} ${user.lastName}`
console.log(`${email}||${src}||${displayName}`)

  return (<>


   <GameClientComponent email={email} src={src} name={displayName}/>
</>
  )
}
