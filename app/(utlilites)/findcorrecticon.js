import {
  FaChessQueen,
  FaChessKnight,
  FaChessKing,
  FaChessPawn,
  FaChessBishop,
  FaChessRook,
} from "react-icons/fa";
import {
  FaRegChessQueen,
  FaRegChessKnight,
  FaRegChessKing,
  FaRegChessPawn,
  FaRegChessBishop,
  FaRegChessRook,} from "react-icons/fa6"
export function findcorrecticon(color, piece, bull,colortomove) {
//// Function to find correct icon of piece located on the field///



  const style = { margin: "auto" };
 

  let iconcolor = "black"

  if (bull&&bull!=="verysmall") {
    iconcolor = "red";
  }

  const classname= colortomove==="black" ? "rotate-180 hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer text-[45px] lg:text-[50px]" : "hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer text-[45px] lg:text-[50px]"

  if (piece === "Pawn") {
let  icontoreturn = color==="black" ? (
      <FaChessPawn color={iconcolor}  style={style}  className={classname} />
    ) : (<FaRegChessPawn   style={style} color={iconcolor}  className={`${classname} `} />) ; 




    return icontoreturn;
  }

  if (piece === "Rook") {
    let  icontoreturn = color==="black" ? (
      <FaChessRook color={iconcolor}  style={style}  className={classname} />
    ) : (<FaRegChessRook style={style}  color={iconcolor} className={`${classname}  `} />) ; 

    return icontoreturn;
  }
  if (piece === "Bishop") {
    let  icontoreturn = color==="black" ? (
      <FaChessBishop color={iconcolor}  style={style}  className={classname} />
    ) : (<FaRegChessBishop  style={style}  color={iconcolor}  className={`${classname}  `} />) ; 


    return icontoreturn;
  }
  if (piece === "Knight") {
    let  icontoreturn = color==="black" ? (
      <FaChessKnight color={iconcolor} style={style}  className={classname} />
    ) : (<FaRegChessKnight  style={style} color={iconcolor}  className={`${classname}  `} />) ; 

    return icontoreturn;
  }
  if (piece === "Queen") {
    let  icontoreturn = color==="black" ? (
      <FaChessQueen color={iconcolor}  style={style}  className={classname} />
    ) : (<FaRegChessQueen  style={style}  color={iconcolor} className={`${classname}  `} />) ; 


    return icontoreturn;
  }

  if (piece === "King") {
    let  icontoreturn = color==="black" ? (
      <FaChessKing color={iconcolor} style={style}  className={classname} />
    ) : (<FaRegChessKing  style={style}  color={iconcolor}  className={`${classname}  text-black`} />) ; 

    return icontoreturn;
  }
}
