import { checkifkingischecked } from "./IFisChecked";
import { findifcanprotect } from "./findifcanprotectfromcheck";
import { staticchessboard } from "./staticchessbord";

function checkifkingischeckedafterchange(
  color,
  chessboard,
  indexoffield,
  indextocheck1,
  kingfield
) {
  let canbeprotected = false;

  const table = [...chessboard];
  let temp = table[indexoffield];
  let temp2 = table[indextocheck1];

  table[indexoffield] = { ...temp, takenby: temp2.takenby };
  table[indextocheck1] = { ...temp2, takenby: false };

  let IFisChecked = checkifkingischecked(
    color,
    chessboard[kingfield].name[0],
    chessboard[kingfield].name[1],
    table
  );

  if (IFisChecked.ischecked.length === 0) {
    canbeprotected = true;
  }

  return canbeprotected;
}






function findifpawncanprotect(
  field0,
  field1,
  color,
  chessboard,
  kingfield,
  bulliflastindex
) {
 
  let canprotect = false;
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const colorofenemy = (color === "white" ? "black" : "white");

  let indexoffield = staticchessboard.indexOf((tab[field0-1] ) + field1);

  if (color === "white" && bulliflastindex === true) {
    let indextocheck1 = staticchessboard.indexOf(
      tab[field0 - 1 - 1] + (field1 - 1)
    );
    let indextocheck2 = staticchessboard.indexOf(tab[field0] + (field1 - 1));

    if (
      chessboard[indextocheck1]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck1]?.takenby[1] === "Pawn" &&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck1,
        kingfield
      ) === true
    ) {
      return true;
    }

    if (
      chessboard[indextocheck2]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck2]?.takenby[1] === "Pawn" &&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck2,
        kingfield
      ) === true
    ) {
      return true;
    }
  }


  if (color === "black" && bulliflastindex === true) {
    let indextocheck1 = staticchessboard.indexOf(
      tab[field0 - 1 - 1] + (field1 + 1)
    );
    let indextocheck2 = staticchessboard.indexOf(tab[field0] + (field1 + 1));

    if (
      chessboard[indextocheck1]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck1]?.takenby[1] === "Pawn" &&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck1,
        kingfield
      ) === true
    ) {
      return true;
    }

    if (
      chessboard[indextocheck2]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck2]?.takenby[1] === "Pawn" &&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck2,
        kingfield
      ) === true
    ) {
      return true;
    }
  }




  if (color === "white" && bulliflastindex === false) {
    let indextocheck1 = staticchessboard.indexOf(
      tab[field0 - 1] + (field1 - 1)
    );
    let indextocheck2 = staticchessboard.indexOf(
      tab[field0 - 1] + (field1 - 2)
    );

    if (
      chessboard[indextocheck1]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck1]?.takenby[1] === "Pawn" &&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck1,
        kingfield
      ) === true
    ) {
      return true;
    }

    if (
      chessboard[indextocheck2]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck2]?.takenby[1] === "Pawn" &&
      chessboard[indextocheck2].move===0&&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck2,
        kingfield
      ) === true
    ) {
      return true;
    }
  }





  if (color === "black" && bulliflastindex === false) {
    let indextocheck1 = staticchessboard.indexOf(
      tab[field0 - 1] + (field1 + 1)
    );
    let indextocheck2 = staticchessboard.indexOf(
      tab[field0 - 1] + (field1 + 2)
    );

    if (
      chessboard[indextocheck1]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck1]?.takenby[1] === "Pawn" &&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck1,
        kingfield
      ) === true
    ) {
      return true;
    }

    if (
      chessboard[indextocheck2]?.takenby[0] !== colorofenemy &&
      chessboard[indextocheck2]?.takenby[1] === "Pawn" &&
      chessboard[indextocheck2].move===0&&
      checkifkingischeckedafterchange(
        color,
        chessboard,
        indexoffield,
        indextocheck2,
        kingfield
      ) === true
    ) {
      return true;
    }
  }






  return canprotect;
}

export function findprotection(moves, colortomove, chessboard, kingfield) {
  let bull = false;

  for (let i = 0; i < moves.length; i++) {
  const lengt = moves[i].length
    let filtred = moves[i].filter((el, i) => {


      let endofarr = lengt - 1 === i;
 
      let bulll =
        findifcanprotect(
          el.name[0],
          el.name[1],
          colortomove,
          chessboard,
          kingfield
        ) === true;
      if (bulll !== true) {
        const ifpawncanprotect = findifpawncanprotect(
          el.name[0],
          el.name[1],
          colortomove,
          chessboard,
          kingfield,
          endofarr
        );




        if (ifpawncanprotect === true) {
          console.log("Pawn protects");
          bulll = true;
        }
      }

      return bulll === true;
    });

    if (filtred.length > 0) {
      return true;
    }
  }

  return bull;
}
