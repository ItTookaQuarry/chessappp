import { staticchessboard } from "./staticchessbord";
import { checkifcangothere } from "./checkifpiececangothere";
export function movesforbishop(color, field0, field1, chessboard, index) {
///function will check all moves for bishop//

  let tableofpossiblemoves = [];
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let i;

  const colorofenemy = color === "white" ? "black" : "white";

  let bullsifpiececangothere = [true, true, true, true];
///by default all directions will be checked on iteration of loop.
// if There will be any piece on the field direction wont be checked anymore.
  let numberoffinisheddirections = 0;
/// Number of finished directions is declared in order to break loop if all the directions are finished.
  for (i = 1; i < 9; i++) {
    const moves = [
      staticchessboard.indexOf(tab[field0 - 1 + i] + (field1 + i)),
      staticchessboard.indexOf(tab[field0 - 1 - i] + (field1 + i)),
      staticchessboard.indexOf(tab[field0 - i - 1] + (field1 - i)),
      staticchessboard.indexOf(tab[field0 + i - 1] + (field1 - i)),
    ];




    for (let j = 0; j < moves.length; j++) {
      if (numberoffinisheddirections === 4) {
        //loop breaks if all directions are finished
        break;
      }

      if (bullsifpiececangothere[j]) {
        let obj = checkifcangothere(moves[j], chessboard, color, colorofenemy);
/// Object that retuns from the function that checks if player can go there
// If there is enemy piece on that field player can go there but direction wont be checked anymore
// if there is ally piece on that field player cannot go there and direction wont be checked anymore
        if (obj.cangothere) {
          tableofpossiblemoves.push(obj.index);
       
        }
        if (obj.changeifstillcangothisdirection) {
          bullsifpiececangothere[j] = false;
          numberoffinisheddirections = numberoffinisheddirections + 1;
        }
      }
    }
  }

  return { table: tableofpossiblemoves, index: index };
}
