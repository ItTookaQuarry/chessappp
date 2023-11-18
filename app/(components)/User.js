"use client"
import React from 'react'
import {Image} from "@nextui-org/react";
// import {Textarea} from "@nextui-org/react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Divider } from '@nextui-org/divider';
import {Textarea} from "@nextui-org/react";
import { FaRegEdit } from "react-icons/fa";
import { Button } from '@nextui-org/react'
import { myAction } from '../actions'
import { FaChess } from 'react-icons/fa';
import Gameinuserhistory from "../(components)/Gameinuserhistory";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
export default function User(props) {

const history= props.history


const [indextodisplay,setindextodisplay] = React.useState(null)





  return (
    <div className='grid gap-20'>
  
  
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
      </CardHeader>
      <Divider/>
      <CardBody>
      {/* <Textarea
      label="Description"
      placeholder="Enter your description"
      className="max-w-xs"
    /> */}
    <p>{props?.data?.Description}</p>
      </CardBody>
      <Divider />
      <CardFooter>

        <form className='m-auto flex gap-10' action={myAction} method='POST'>

        {/* <input type="text" name="name" value={123}/> */}


      <Textarea
        name='desciption'
    />
   <div> <br></br></div>
    <Button color="danger" variant="bordered" startContent={<FaRegEdit />} type='submit'>
      </Button>

      </form>
      </CardFooter>
    </Card>


{indextodisplay===null&&
    <Table aria-label="Example static collection table" className='col-span-full m-auto lg:w-[650px] w-[450px]'>
      <TableHeader>
        <TableColumn>Wygrał</TableColumn>
        <TableColumn>Przegrał</TableColumn>
        <TableColumn></TableColumn>
      </TableHeader>
      <TableBody>
{history.map((each,index)=>{

const lost = each.lost === "black" ? each.black : each.white
let  won = each.lost === "black" ? each.white : each.black
let wontoupper = won[0].toUpperCase()+ [...won].splice(1,[...won].length-1).join("")
let losttoupper= lost[0].toUpperCase()+ [...lost].splice(1,[...lost].length-1).join("")


return  (    <TableRow key="1">





<TableCell >{wontoupper}
{won===each.white&&<div><FaChess size={"30px"}/></div>}
{won===each.black&&<div><FaChess color='black' size={"30px"}/></div>}
</TableCell>
<TableCell >{losttoupper}
{lost===each.white&&<div className='m-auto'><FaChess size={"30px"} /></div>}
{lost===each.black&&<div ><FaChess color='black' size={"30px"}/></div>}

</TableCell>
<TableCell className='grid text-center'> 
<div>
<Button color="success"
onClick={()=>{
setindextodisplay(
((prev)=>{
if(prev===index){
  return null
}

if(prev!==index){
  return index
}

})

)


}}

endContent={
  <FaArrowAltCircleRight />}>
       Zobacz grę
      </Button>   
  </div></TableCell>
</TableRow>)
})
}
    
      </TableBody>
    </Table>}

    {indextodisplay!==null&&<Gameinuserhistory
    hide={setindextodisplay}
    
    history={history[indextodisplay]}/>}
  </div>
  )
}
