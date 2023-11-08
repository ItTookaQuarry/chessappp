import React from "react";
import {
  FaChessQueen,
  FaChessKnight,
  FaChessBishop,
  FaChessRook,
} from "react-icons/fa";
export default function Dropdown(props) {
  let iconcolor = props.color !== "black" ? "white" : "black";

  let classn =
    props.color !== "black"
      ? "hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer text-center m-auto"
      : "hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer text-center m-auto rotate-180";

  return (
    <>
      <ul
        class="absolute z-[1000] float-left m-0 min-w-max list-none overflow-hidden rounded-lg border-none bg-white bg-clip-padding text-center text-base shadow-lg dark:bg-neutral-700 "
        data-te-dropdown-menu-ref
      >
        <li
          onClick={() => {
            props.onklikfunct("Rook");
          }}
        >
          <a
            class="block w-full text-center whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="#"
            data-te-dropdown-item-ref
          >
            {" "}
            <FaChessRook
              color={iconcolor}
              size={"2em"}
              className={classn}
            />{" "}
          </a>
        </li>
        <li
          onClick={() => {
            props.onklikfunct("Knight");
          }}
        >
          <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="#"
            data-te-dropdown-item-ref
          >
            <FaChessKnight
              color={iconcolor}
              size={"2em"}
              className={classn}
            />
          </a>
        </li>
        <li
          onClick={() => {
            props.onklikfunct("Bishop");
          }}
        >
          <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="#"
            data-te-dropdown-item-ref
          >
            <FaChessBishop
              color={iconcolor}
              size={"2em"}
              className={classn}
            />
          </a>
        </li>
        <li
          onClick={() => {
            props.onklikfunct("Queen");
          }}
        >
          <a
            class="block w-full whitespace-nowrap bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
            href="#"
            data-te-dropdown-item-ref
          >
            <FaChessQueen
              color={iconcolor}
              size={"2em"}
              className={classn}
            />
          </a>
        </li>
      </ul>
    </>
  );
}
