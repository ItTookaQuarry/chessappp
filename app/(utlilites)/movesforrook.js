import { staticchessboard } from "./staticchessbord";
import { checkifcangothere } from "./checkifpiececangothere";
export function movesforrook(color, field0, field1, chessboard, index) {
  //All functions with moves for pieces are similar to each other. If you want to check 
  // what each piece of code means go to utilites/moveforbishop.js.
  let tableofpossiblemoves = [];
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let i;

  const colorofenemy = color === "white" ? "black" : "white";

  let bullsifpiececangothere = [true, true, true, true];
  let numberoffinisheddirections=0
  for (i = 1; i < 9; i++) {
    const moves = [
      staticchessboard.indexOf(tab[field0 - 1] + (field1 + i)),
      staticchessboard.indexOf(tab[field0 - 1] + (field1 - i)),
      staticchessboard.indexOf(tab[field0 - i - 1] + field1),
      staticchessboard.indexOf(tab[field0 + i - 1] + field1),
    ];









    for (let j = 0; j < moves.length; j++) {
      if (numberoffinisheddirections === 4) {
        break;
      }
      if (bullsifpiececangothere[j]) {
        let obj = checkifcangothere(moves[j], chessboard, color, colorofenemy);

        if (obj.cangothere) {
          tableofpossiblemoves.push(obj.index);
        }
        if (obj.changeifstillcangothisdirection) {
          bullsifpiececangothere[j] = false;
          numberoffinisheddirections=numberoffinisheddirections+1
        }
      }
    }
  }

  return { table: tableofpossiblemoves, index: index };
}
