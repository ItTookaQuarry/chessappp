import React from 'react'
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
  } from "@nextui-org/react";
  import { FaChess } from 'react-icons/fa';
  import { Button } from '@nextui-org/react';
  import { FaArrowAltCircleRight } from 'react-icons/fa';
export default function History(props) {
const history= props.history




  return (
    <div>   <Table
    aria-label="Example static collection table"
    className="col-span-full m-auto lg:w-[650px] w-[450px]"
  >
    <TableHeader>
      <TableColumn>Wygrał</TableColumn>
      <TableColumn>Przegrał</TableColumn>
      <TableColumn></TableColumn>
      <TableColumn></TableColumn>
    </TableHeader>
    <TableBody>
      {history.sort((a,b)=>{
return a.number - b.number
      }).map((each, index) => {
    
const timemonth= `${each.time.month}`.length ===2 ? each.time.month : `0${each.time.month}`

const timeday= `${each.time.day}`.length===2 ? each.time.day : `0${each.time.day}`
        const lost = each.lost === "black" ? each.black : each.white;
        let won = each.lost === "black" ? each.white : each.black;
        let wontoupper =
          won[0].toUpperCase() +
          [...won].splice(1, [...won].length - 1).join("");
        let losttoupper =
          lost[0].toUpperCase() +
          [...lost].splice(1, [...lost].length - 1).join("");

        return (
          <TableRow key={index}>
            <TableCell>
              {wontoupper}
              {won === each.white && (
                <div>
                  <FaChess size={"30px"} />
                </div>
              )}
              {won === each.black && (
                <div>
                  <FaChess color="black" size={"30px"} />
                </div>
              )}
            </TableCell>
            <TableCell>
              {losttoupper}
              {lost === each.white && (
                <div className="m-auto">
                  <FaChess size={"30px"} />
                </div>
              )}
              {lost === each.black && (
                <div>
                  <FaChess color="black" size={"30px"} />
                </div>
              )}
            </TableCell>
            
            <TableCell className="flex "> {each.time.year }/{timemonth}/{timeday}
            
            
          
            </TableCell>
            <TableCell className="grid text-center">
              <div>
                <Button
                  color="success"
                  onClick={() => {
                    props.setindextodisplay((prev) => {
                      if (prev === index) {
                        return null;
                      }

                      if (prev !== index) {
                        return index;
                      }
                    });
                  }}
                  endContent={<FaArrowAltCircleRight />}
                >
                  Zobacz grę
                </Button>
              </div>
            </TableCell>

          </TableRow>
        );
      })}
    </TableBody>
  </Table></div>
  )
}
