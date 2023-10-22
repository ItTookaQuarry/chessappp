
import { movesforrking } from "./movesforking";
import { movesforknight } from "./movesforknight";
import { movesforrook } from "./movesforrook";
import { movesforbishop } from "./movesforbishop";
import { movesforrqueen } from "./movesforqueen";
import { movesforpawn } from "./movesforpawn";

export function findcorrectpiece(color, piece, fieldname0, fieldname1, chessboard, index,beatinginpassing){

  if (piece === "Pawn") {
    const obj = movesforpawn(
      color,
      fieldname0,
      fieldname1,
      chessboard,
      index,
      beatinginpassing
  
    );
  
    return obj
  
  }



    if (piece === "King") {
        const obj = movesforrking(
          color,
          fieldname0,
          fieldname1,
          chessboard,
          index
        );

  
        return obj
      }
  

     




      if (piece === "Knight") {
        const obj = movesforknight(
          color,
          fieldname0,
          fieldname1,
          chessboard,
          index
        );

  
        return obj
      }
      if (piece === "King") {
        const obj = movesforrking(
          color,
          fieldname0,
          fieldname1,
          chessboard,
          index
        );

  
        return obj
      }
      if (piece === "Rook") {
        const obj = movesforrook(
          color,
          fieldname0,
          fieldname1,
          chessboard,
          index
        );
   
  
        return obj
      }
  
      if (piece === "Bishop") {
        const obj = movesforbishop(
          color,
          fieldname0,
          fieldname1,
          chessboard,
          index
        );

        return obj
      }
  
      if (piece === "Queen") {
        const obj = movesforrqueen(
          color,
          fieldname0,
          fieldname1,
          chessboard,
          index
          
        );
        ////Conditions that run function to find moves for piece that is chosen
  

  
        return obj
      } else return;










}