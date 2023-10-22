import { staticchessboard } from "./staticchessbord";
import { checkifcangothere } from "./checkifpiececangothere";
import {checkifkingischecked} from "./IFisChecked";
import {checkking} from "./checkking"
export function movesforrking(color, field0, field1, chessboard, index) {
    let tableofpossiblemoves = [];
    let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let i;
  
    const colorofenemy = color === "white" ? "black" : "white";
  
    let bullsifpiececangothere = [true, true, true, true,true,true,true,true];
    let numberoffinisheddirections=0
    for (i = 1; i <=1; i++) {
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










    return { table: tableofpossiblemoves.filter((each)=>{

return checkking(color,chessboard[each].name[0],chessboard[each].name[1],chessboard)===true
   



    }).filter((each)=>{
      const bull = checkifkingischecked(color,chessboard[each].name[0],chessboard[each].name[1],chessboard).ischecked.length ===0

      return bull === true
      
      }) , index: index };
  }
  