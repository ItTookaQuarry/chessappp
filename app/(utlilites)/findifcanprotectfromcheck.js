import { checkifkingischecked } from "./IFisChecked";
import { staticchessboard } from "./staticchessbord";
import { knightmoves } from "./allpossiblemovesforpiece";
export function findifcanprotect(field0, field1, color, chessboard, kingfield) {
  ///Function that finds out if piece can protect from check.
  // If piece can cover king or take piece that puts king in check
  // we have to check if it is not pinned by other piece.
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let canbeprotected = false;

  let arrtocheck = [false, false, false, false, false, false, false, false];

  let filtred = knightmoves.map((each) => {
    const fieldone = field0 + each[0] - 1;
    const fieldtwo = field1 + each[1];

    let field = chessboard[staticchessboard.indexOf(tab[fieldone] + fieldtwo)];
    
    if (field?.takenby[0] === color && field?.takenby[1] === "Knight") 
    
    {
      const table = [...chessboard];

      const i1 = staticchessboard.indexOf(tab[field0 - 1] + field1);
      const i2 = staticchessboard.indexOf(tab[fieldone] + fieldtwo);
      let temp = table[i1];
      let temp2 = table[i2];

      table[i1] = { ...temp, takenby: temp2.takenby };
      table[i2] = { ...temp2, takenby: false };

      let IFisChecked = checkifkingischecked(
        color,
        chessboard[kingfield].name[0],
        chessboard[kingfield].name[1],
        table
      );

      if (IFisChecked.ischecked.length === 0) {
        
        
        canbeprotected = true;
      }
    }

    return null;
  });

  if (canbeprotected === true) {
    return true;
  }

  for (let i = 1; i < 9; i++) {
    let moves = [
      {
        field: staticchessboard.indexOf(tab[field0 - 1 + i] + (field1 + i)),
        piece: "Bishop",
        index: 0,
      },
      {
        field: staticchessboard.indexOf(tab[field0 - 1 - i] + (field1 + i)),
        piece: "Bishop",
        index: 1,
      },
      {
        field: staticchessboard.indexOf(tab[field0 - i - 1] + (field1 - i)),
        piece: "Bishop",
        index: 2,
      },
      {
        field: staticchessboard.indexOf(tab[field0 + i - 1] + (field1 - i)),
        piece: "Bishop",
        index: 3,
      },

      {
        field: staticchessboard.indexOf(tab[field0 - 1] + (field1 + i)),
        piece: "Rook",
        index: 4,
      },
      {
        field: staticchessboard.indexOf(tab[field0 - 1] + (field1 - i)),
        piece: "Rook",
        index: 5,
      },
      {
        field: staticchessboard.indexOf(tab[field0 - i - 1] + field1),
        piece: "Rook",
        index: 6,
      },
      {
        field: staticchessboard.indexOf(tab[field0 + i - 1] + field1),
        piece: "Rook",
        index: 7,
      },
    ]
      .filter((each, index) => {

     if(chessboard[each?.field]?.takenby[0]===color&&chessboard[each?.field]?.takenby[1]!==undefined){
if(chessboard[each?.field]?.takenby[1]!==each.piece&&chessboard[each?.field].takenby[1]!=="Queen"){

  

  arrtocheck[each.index]=true

}



     }

        return (
          chessboard[each?.field] !== undefined && arrtocheck[index] !== true
        );
      })
      .filter((each) => {
        let bull1 =
          chessboard[each.field].takenby[1] === each.piece &&
          chessboard[each.field].takenby[0] === color;

        let bull2 =
          chessboard[each.field].takenby[1] === "Queen" &&
          chessboard[each.field].takenby[0] === color;

        //
        const bull3 = bull1 === true || bull2 === true;

        if (bull3) {
          arrtocheck[each.index]=true


          const fieldone = chessboard[each?.field]?.name[0];
          const fieldtwo = chessboard[each?.field]?.name[1];

          const table = [...chessboard];

          const i1 = staticchessboard.indexOf(tab[field0 - 1] + field1);
          const i2 = staticchessboard.indexOf(tab[fieldone - 1] + fieldtwo);
          let temp = table[i1];
          let temp2 = table[i2];
          //
          table[i1] = { ...temp, takenby: temp2.takenby };
          table[i2] = { ...temp2, takenby: false };

          //
          //

          let IFisChecked = checkifkingischecked(
            color,
            chessboard[kingfield].name[0],
            chessboard[kingfield].name[1],
            table
          );

          if (IFisChecked.ischecked.length === 0) {
            canbeprotected = true;
          }
        }

        return bull3;
      });
  }

  return canbeprotected;
}
