import { staticchessboard } from "./staticchessbord";
import { knightmoves } from "./allpossiblemovesforpiece";

export function checkifkingischecked(color, field0, field1, chessboard) {
  let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let tabtoreturn = [];
  let tabofmovesbetween=[[],[],[],[],[],[],[],[]]
  let tabofmovesbetweentoreturn=[]
  let colorofenemy = color === "white" ? "black" : "white";

  let arrtocheck = [false, false, false, false, false, false, false, false];



if(color==="black"&&chessboard[staticchessboard.indexOf(tab[field0-1-1]+ (field1-1))]?.takenby!==false){

  if(chessboard[staticchessboard.indexOf(tab[field0-1-1]+ (field1-1))]?.takenby[1]==="Pawn"&&
  chessboard[staticchessboard.indexOf(tab[field0-1-1]+ (field1-1))]?.takenby[0]!==color){

    tabofmovesbetweentoreturn.push([staticchessboard.indexOf(tab[field0-1-1]+ (field1-1))])

    tabtoreturn.push(staticchessboard.indexOf(tab[field0-1-1]+ (field1-1)))
  }
}


if(color==="black"&&chessboard[staticchessboard.indexOf(tab[field0]+ (field1-1))]?.takenby!==false){

    if(chessboard[staticchessboard.indexOf(tab[field0]+ (field1-1))]?.takenby[1]==="Pawn"&&
    chessboard[staticchessboard.indexOf(tab[field0]+ (field1-1))]?.takenby[0]!==color){

      tabofmovesbetweentoreturn.push([staticchessboard.indexOf(tab[field0]+ (field1-1))])
  
      tabtoreturn.push(staticchessboard.indexOf(tab[field0]+ (field1-1)))
    }
  }
  
  if(color==="white"&&chessboard[staticchessboard.indexOf(tab[field0]+ (field1+1))]?.takenby!==false){

    if(chessboard[staticchessboard.indexOf(tab[field0]+ (field1+1))]?.takenby[1]==="Pawn"&&
    chessboard[staticchessboard.indexOf(tab[field0]+ (field1+1))]?.takenby[0]!==color){

      tabofmovesbetweentoreturn.push([staticchessboard.indexOf(tab[field0]+ (field1-1))])
  
      tabtoreturn.push(staticchessboard.indexOf(tab[field0]+ (field1+1)))
    }
  }
  if(color==="white"&&chessboard[staticchessboard.indexOf(tab[field0-1-1]+ (field1+1))]?.takenby!==false){

    if(chessboard[staticchessboard.indexOf(tab[field0-1-1]+ (field1+1))]?.takenby[1]==="Pawn"&&
    chessboard[staticchessboard.indexOf(tab[field0-1-1]+ (field1+1))]?.takenby[0]!==color){

      tabofmovesbetweentoreturn.push([staticchessboard.indexOf(tab[field0-1-1]+ (field1-1))])
  
      tabtoreturn.push(staticchessboard.indexOf(tab[field0]+ (field1+1)))
    }
  }











  let filtred = knightmoves
    .filter((each) => {
      const fieldone = field0 + each[0] - 1;
      const fieldtwo = field1 + each[1];

      let field =
        chessboard[staticchessboard.indexOf(tab[fieldone] + fieldtwo)];


         if(field?.takenby[0] === colorofenemy && field?.takenby[1] === "Knight"){
          tabtoreturn.push(field?.takenby[0] === colorofenemy && field?.takenby[1] )
         }
           
         if((field?.takenby[0] === colorofenemy && field?.takenby[1] === "Knight"
         )){
          tabofmovesbetweentoreturn.push([staticchessboard.indexOf(tab[fieldone] + fieldtwo)])
         }

      return (
      
        field?.takenby[0] === colorofenemy && field?.takenby[1] === "Knight"
      );
    })
   








  for (let i = 1; i < 9; i++) {
    let moves = [
      {
        field: staticchessboard.indexOf(tab[field0 - 1 + i] + (field1 + i)),
        piece: "Bishop",
        index:0,
      },
      {
        field: staticchessboard.indexOf(tab[field0 - 1 - i] + (field1 + i)),
        piece: "Bishop",
        index:1,
      },
      {
        field: staticchessboard.indexOf(tab[field0 - i - 1] + (field1 - i)),
        piece: "Bishop",
        index:2,
      },
      {
        field: staticchessboard.indexOf(tab[field0 + i - 1] + (field1 - i)),
        piece: "Bishop",
        index:3
      },

      {
        field: staticchessboard.indexOf(tab[field0 - 1] + (field1 + i)),
        piece: "Rook",
        index:4
      },
      {
        field: staticchessboard.indexOf(tab[field0 - 1] + (field1 - i)),
        piece: "Rook",
        index:5
      },
      {
        field: staticchessboard.indexOf(tab[field0 - i - 1] + field1),
        piece: "Rook",
        index:6
      },
      {
        field: staticchessboard.indexOf(tab[field0 + i - 1] + field1),
        piece: "Rook",
        index:7
      },
    ]
      .filter((each, index) => {


        if (
          chessboard[each?.field]?.takenby[0] === color &&
          chessboard[each.field].takenby[1] !== "King"
        ) {
          arrtocheck[index] = true;
        }
        if (
          chessboard[each?.field]?.takenby[0] === colorofenemy &&
          chessboard[each.field].takenby[1] !== each.piece &&
          chessboard[each.field].takenby[1] !== "Queen"
        ) {
          arrtocheck[index] =
            true 
        }



        return (
          chessboard[each?.field] !== undefined && arrtocheck[index] !== true
        );
      })
      .filter((each) => {


        tabofmovesbetween[each.index].push((each))
      
        let bull1 = chessboard[each.field].takenby[1] === each.piece;

        let bull2 = chessboard[each.field].takenby[1] === "Queen";

        const bull3 = bull1 === true || bull2 === true;

  if( bull3){
    arrtocheck[each.index]= true
  }



        return chessboard[each.field].takenby[0] === colorofenemy && bull3;
      });

    if (moves.length >= 1) {

  



      tabtoreturn.push(
        moves.map((each) => {
          tabofmovesbetweentoreturn.push(tabofmovesbetween[each.index])
          
          return chessboard[each.field];
        })
      );
    }
  }

  return {ischecked:tabtoreturn,movestoprotect: tabofmovesbetweentoreturn.map((each)=>{
    return each.map((el)=>{

 const toreturn = el.field=== undefined ?  chessboard[el] : chessboard[el.field]


 
      return toreturn
    })
  })}
}
