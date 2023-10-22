import { staticchessboard } from "./staticchessbord";
import { knightmoves } from "./allpossiblemovesforpiece";
export const movesforknight = function (color, field0, field1, chessboard,index) {
  //All functions with moves for pieces are similar to each other. If you want to check 
  // what each piece of code means go to utilites/moveforbishop.js.
  let tableofpossiblemoves = [];
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let allposiblemovesforknight = knightmoves
  for (let i = 0; i < allposiblemovesforknight.length; i++) {
    if (
      field0 - allposiblemovesforknight[i][0] <= 8 &&
      field0 - allposiblemovesforknight[i][0] >= 1 &&
      field1 - allposiblemovesforknight[i][1] <= 8 &&
      field1 - allposiblemovesforknight[i][1] >= 1
    ) {

const chessfieldname= (tab[field0-allposiblemovesforknight[i][0]-1])+(field1 - allposiblemovesforknight[i][1])
const index = staticchessboard.indexOf(chessfieldname)






if(chessboard[index].takenby[0]!==color)
        tableofpossiblemoves.push(index)
    }

 


  }

  return {table:tableofpossiblemoves,index:index};
};
