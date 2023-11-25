"use client";

import React from "react";
import { findcorrecticon } from "../(utlilites)/findcorrecticon";
import { Slider } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/react";
import { IoCloseCircle } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
export default function Gameinuserhistory(props) {
  let fromwhitetoblack = true;
  let color;

  let History = props.history.history.history;

  History = History.filter((each, i) => {
    let filtred = each.board.filter((brd, index) => {
      return (
        brd.takenby === false && History[i + 1]?.board[index]?.takenby !== false
      );
    });

    return filtred.length !== 0;
  });

  const [boardtoshow, setboardtoshow] = React.useState(History[0].board);

  const [slider, setslider] = React.useState(0);

  React.useEffect(() => {
    setboardtoshow(History[slider].board);


      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider]);

  return (
    <>
      <div className=" absolute h-screen w-screen bg-black z-20 ">
        <div
          class={
            "grid border-solid border-2 border-indigo-600 w-[400px] h-auto lg:h-[500px] lg:w-[600px] md:w-[400px] h-[450px] w-5/6 md:h-[450px] md:w-full rounded lg:col-start-1 lg:col-span-2   grid-cols-8 grid-rows-8 md:col-start-1 md:col-span-2 auto-rows-fr col-span-full m-auto  "
          }
        >
          <div className="flex col-span-full m-auto lg:gap-20 gap-10">
            <Button
              variant="bordered"
              onClick={() => {
                setslider((prev) => {
                  const toreturn = prev - 1 >= 0 ? prev - 1 : 0;

                  return toreturn;
                });
              }}
              className="col-span-full m-auto"
              startContent={<FaArrowLeft />}
            ></Button>

            <Button
              color="danger"
              variant="bordered"
              onClick={() => {
                props.hide(null);
              }}
              className="col-span-full m-auto"
              startContent={<IoCloseCircle />}
            >
              Zamknij
            </Button>

            <Button
              variant="bordered"
              onClick={() => {
                setslider((prev) => {
                  const toreturn =
                    prev + 1 <= History.length - 1
                      ? prev + 1
                      : History.length - 1;

                  return toreturn;
                });
              }}
              // onClick={(prev) => {
              //   const toreturn = prev +1 <= History.length-1 ? prev +1  : History.length-1

              //     return toreturn}}
              className="col-span-full m-auto"
              startContent={<FaArrowRight />}
            ></Button>
          </div>

          {boardtoshow.map((each, index) => {
            let border = "1px solid black";

            let i = index + 1;

            if (fromwhitetoblack) {
              color = i % 2 == 0 ? "#4caf50" : "#f3e5ab";
            }

            if (!fromwhitetoblack) {
              color = i % 2 == 0 ? "#f3e5ab" : "#4caf50";
            }

            if (i % 8 == 0) {
              fromwhitetoblack = !fromwhitetoblack;
            }
            const Icon = each.takenby
              ? findcorrecticon(each.takenby[0], each.takenby[1])
              : false;

            if (1 === 1) {
              return (
                <div
                  key={index}
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: color,
                    display: "grid",
                    border: `${border}`,
                  }}
                >
                  {Icon && <div style={{ margin: "auto" }}> {Icon} </div>}
                </div>
              );
            }
          })}
        </div>
        {History.length>1 && 
        
        <div className="grid w-screen">
        <Slider
          value={slider}
          onChange={(val) => {
            setslider(val);
          }}
          label="Przesuń by zobaczyć grę"
          color="foreground"
          size="sm"
          step={1}
          maxValue={History.length - 1}
          className=" col-span-full m-auto lg:w-[500px] w-5/6"
        />
        
        </div>
        }
       
      </div>
    </>
  );
}
