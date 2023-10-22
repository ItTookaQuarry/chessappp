import { staticchessboard } from "./staticchessbord";
import { checkifcangothere } from "./checkifpiececangothere";
export function movesforrqueen(color, field0, field1, chessboard, index) {
  let tableofpossiblemoves = [];
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let i
  const colorofenemy = color === "white" ? "black" : "white";

  let bullsifpiececangothere = [true, true, true, true,true,true,true,true];
  let numberoffinisheddirections=0


  for (i = 1; i < 9; i++) {
      const moves = [
    staticchessboard.indexOf(tab[field0 - 1] + (field1 + i)),
    staticchessboard.indexOf(tab[field0 - 1] + (field1 - i)),
    staticchessboard.indexOf(tab[field0 - i - 1] + field1),
    staticchessboard.indexOf(tab[field0 + i - 1] + field1),
    staticchessboard.indexOf(tab[field0 - 1 + i] + (field1 + i)),
    staticchessboard.indexOf(tab[field0 - 1 - i] + (field1 + i)),
    staticchessboard.indexOf(tab[field0 - i - 1] + (field1 - i)),
    staticchessboard.indexOf(tab[field0 + i - 1] + (field1 - i)),

];
 
    for (let j = 0; j < moves.length; j++) {

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
