import { findifcanprotect } from "./findifcanprotectfromcheck";
export function findprotection(moves, colortomove, chessboard, kingfield) {
  let bull = false;

  for (let i = 0; i < moves.length; i++) {
    let filtred = moves[i].filter((el) => {
      let bulll =
        findifcanprotect(
          el.name[0],
          el.name[1],
          colortomove,
          chessboard,
          kingfield
        ) === true;

      return bulll === true;
    });


    if(filtred.length>0){
        return true
    }
  }

  return bull;
}
