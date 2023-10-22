import { staticchessboard } from "./staticchessbord";

export function checkking(color, field0, field1, chessboard){
let toreuturn= true
    let tab = ["A", "B", "C", "D", "E", "F", "G", "H"];

    for (let i = 1; i <=1; i++) {
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
    
if(chessboard[moves[j]]?.takenby[0]!==color&&
    chessboard[moves[j]]?.takenby[1]==="King"){
        toreuturn=false
    }




        }
    }


    return toreuturn

}