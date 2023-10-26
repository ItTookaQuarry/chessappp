import {
  FaChessQueen,
  FaChessKnight,
  FaChessKing,
  FaChessPawn,
  FaChessBishop,
  FaChessRook,
} from "react-icons/fa";

export function findcorrecticon(color, piece, bull) {
//// Function to find correct icon of piece located on the field///



  const style = { margin: "auto" };
  const size = bull!=="verysmall" ?  "3em": "50%" ;

  let iconcolor = color !== "black" ? "orange" : "brown";

  if (bull&&bull!=="verysmall") {
    iconcolor = "red";
  }

  if (piece === "Pawn") {
    const icontoreturn = (
      <FaChessPawn color={iconcolor} size={size} style={style}  className="hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer"/>
    );

    return icontoreturn;
  }

  if (piece === "Rook") {
    const icontoreturn = (
      <FaChessRook color={iconcolor} size={size} style={style} className="hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer"/>
    );

    return icontoreturn;
  }
  if (piece === "Bishop") {
    const icontoreturn = ( 
      <FaChessBishop color={iconcolor} size={size} style={style}  className="hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer" />
    );

    return icontoreturn;
  }
  if (piece === "Knight") {
    const icontoreturn = (
      <FaChessKnight color={iconcolor} size={size} style={style}   className="hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer" />
    );
    return icontoreturn;
  }
  if (piece === "Queen") {
    const icontoreturn = (
      <FaChessQueen color={iconcolor} size={size} style={style}  className="hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer" />
    );

    return icontoreturn;
  }

  if (piece === "King") {
    const icontoreturn = (
      <FaChessKing color={iconcolor} size={size} style={style}  className="hover:-translate-y-1 hover:scale-110 duration-300 hover:cursor-pointer" />
    );

    return icontoreturn;
  }
}
