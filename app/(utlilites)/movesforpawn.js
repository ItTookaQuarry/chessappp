import { staticchessboard } from "./staticchessbord";

export function movesforpawn(
  color,
  field0,
  field1,
  chessboard,
  index,
  beating
) {
  let pawnbeatedanotherpawninpassing = false;
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let colorofenemy = color === "white" ? "black" : "white";

  let numberofmoves =
    chessboard[staticchessboard.indexOf(tab[field0 - 1] + field1)].move;

  const moveswhite =
    numberofmoves === 0
      ? [
          staticchessboard.indexOf(tab[field0 - 1] + (field1 + 1)),
          staticchessboard.indexOf(tab[field0 - 1] + (field1 + 2)),
        ]
      : [staticchessboard.indexOf(tab[field0 - 1] + (field1 + 1))];

  const movesblack =
    numberofmoves === 0
      ? [
          staticchessboard.indexOf(tab[field0 - 1] + (field1 - 1)),
          staticchessboard.indexOf(tab[field0 - 1] + (field1 - 2)),
        ]
      : [staticchessboard.indexOf(tab[field0 - 1] + (field1 - 1))];

  let moves = color === "white" ? moveswhite : movesblack;

  let movestoreturn = moves.filter((each, index) => {
    return chessboard[each].takenby[0] === undefined;
  });

  if (movestoreturn.length === 1 && movestoreturn[0] === moves[1]) {
    movestoreturn = [];
  }

  if (
    (chessboard[staticchessboard.indexOf(tab[field0 - 1 + 1] + (field1 + 1))]
      ?.takenby[0] === colorofenemy &&
      color === "white") ||
    staticchessboard.indexOf(tab[field0 - 1 + 1] + field1) === beating && color==="white"
  ) {
    movestoreturn.push(
      staticchessboard.indexOf(tab[field0 - 1 + 1] + (field1 + 1))
    );
  }

  if (
    (chessboard[staticchessboard.indexOf(tab[field0 - 1 - 1] + (field1 + 1))]
      ?.takenby[0] === colorofenemy &&
      color === "white") ||
    staticchessboard.indexOf(tab[field0 - 1 - 1] + field1) === beating && color==="white"
  ) {
    movestoreturn.push(
      staticchessboard.indexOf(tab[field0 - 1 - 1] + (field1 + 1))
    );
  }

  if (
    (chessboard[staticchessboard.indexOf(tab[field0 - 1 - 1] + (field1 - 1))]
      ?.takenby[0] === colorofenemy &&
      color === "black") ||
    staticchessboard.indexOf(tab[field0 - 1 - 1] + field1) === beating && color==="black"
  ) {
    movestoreturn.push(
      staticchessboard.indexOf(tab[field0 - 1 - 1] + (field1 - 1))
    );
  }

  if (
    (chessboard[staticchessboard.indexOf(tab[field0 - 1 + 1] + (field1 - 1))]
      ?.takenby[0] === colorofenemy &&
      color === "black") ||
    staticchessboard.indexOf(tab[field0 - 1 + 1] + field1) === beating && color==="black"
  ) {
    movestoreturn.push(
      staticchessboard.indexOf(tab[field0 - 1 + 1] + (field1 - 1))
    );
  }

  return { table: movestoreturn, index: index, };
}
