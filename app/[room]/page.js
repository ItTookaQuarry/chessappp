"use client";
import React from "react";
import { findprotection } from "../(utlilites)/findprotection";
import { findcorrecticon } from "../(utlilites)/findcorrecticon";
import { checkifkingischecked } from "../(utlilites)/IFisChecked";
import { findcorrectpiece } from "../(utlilites)/findcorrectpiece";
import { movesforrking } from "../(utlilites)/movesforking";
import Dropdown from "../(utlilites)/Dropdown";
import { usePathname } from "next/navigation";
import { db } from "../(firebase)/firebase";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import Stoperwhite from "../(components)/Stoperwhite";
import StoperBlack from "../(components)/Stoperblack";
import { onSnapshot, updateDoc } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Cookies, { Cookie } from "universal-cookie";
import { Spinner } from "@nextui-org/react";
import Smallicon from "../(components)/Smallicon";
import { Button } from "@nextui-org/react";
import "react-toastify/dist/ReactToastify.css";
import Gameover from "../(components)/Gameover";
import { usePageLeave } from "@reactuses/core";
import { usePageVisibility } from 'react-page-visibility';
export default function Home() {



 
  const isLeft = usePageLeave(); 
  const isVisible = usePageVisibility()

  React.useEffect(()=>{

    if(gamestarted&&!isVisible){
      updateDoc(docRef,{
         left:Yourside
      })
    }
    if(gamestarted&&isVisible){
      updateDoc(docRef,{
         left:false
      })
    }
  
  
  },[isVisible])



React.useEffect(()=>{

  if(gamestarted&&isLeft){
    updateDoc(docRef,{
       left:Yourside
    })
  }
  if(gamestarted&&!isLeft){
    updateDoc(docRef,{
       left:false
    })
  }


},[isLeft])




  const cookies = new Cookies();

  const cookie = cookies.get("temporaryvalue");

  const [isRunning, setIsRunning] = React.useState(null);
  const [update, setupdate] = React.useState(0);
  const [gamestarted, setgamestarted] = React.useState(false);
  const [fetch, setfetch] = React.useState(null);
  const ingame = cookies.get("ingame");
  let pathname = usePathname();
  pathname = pathname.replace("/", "");

  const searchParams = useSearchParams();
  const router = useRouter();
  const url = `${pathname}?${searchParams}`;
  const docRef = doc(db, "rooms", `${pathname}`);





window.addEventListener("beforeunload", function(e){
  if(gamestarted){
    updateDoc(docRef,{
      gameover:Yourside
    })
  }
  if (!gamestarted) {
  
    navigateback();
  }
});


window.onpopstate = function () {
  
  if (!gamestarted) {
    navigateback();
  }
};







  function navigateback() {
    if (searchParams.get("color") === "white" && Yourside === "white") {
      updateDoc(docRef, {
        white: false,
      })
    };

    if (searchParams.get("color") === "black" && Yourside === "black") {
      updateDoc(docRef, {
        black: false,
      });
    }
  }

  React.useEffect(() => {
    if (moveshistory.length === 0) {
      return;
    }

    const docRef = doc(db, "rooms", `${pathname}`);

    const docSnap = updateDoc(docRef, {
      chessboard: chessboard,
      colortomove: colortomove,
      blackkingplaceonchessboard: blackkingplaceonchessboard,
      whitekingplaceonchessboard: whitekingplaceonchessboard,
      colortomove: colortomove,
      gameover: gameover,
      deadwhitepieces: deadwhitepieces,
      deadblackpieces: deadblackpieces,
      beatinginpassing: passingbeating,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);

  React.useEffect(() => {
    onSnapshot(collection(db, "rooms"), (snapshot) => {
   // eslint-disable-next-line react-hooks/exhaustive-deps
      setfetch(snapshot);
    });
  }, []);

  React.useEffect(() => {
    Datafetching();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetch]);

  const [Yourside, setYourside] = React.useState(null);

  const Datafetching = async () => {
    const docRef = doc(db, "rooms", `${pathname}`);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      if (ingame === url) {
        cookies.remove("ingame");
      }

      router.push("rooms");
    } else {
      const data = docSnap.data();

      if (data.gameover||data.gameover===null) {

    

        setgameover(data.gameover);
        setgamestarted(false);
        setcolortomove(false);
        setTimeout(() => {
          deleteDoc(docRef);
        }, 2000);
        cookies.remove("ingame");
        return;
      }

      if (
        searchParams.get("color") === "white" &&
        data.white &&
        data.white !== cookie
      ) {
        router.push("rooms");
      }

      if (
        searchParams.get("color") === "black" &&
        data.black &&
        data.black!== cookie
      ) {
        router.push("rooms");
      }

      if (
        (searchParams.get("color") === "white" && !data.white) ||
        (data.white === cookie && searchParams.get("color") === "white")
      ) {
        setYourside("white");
        await updateDoc(docRef, {
          white: cookie,
        });
      }

      if (
        (searchParams.get("color") === "black" && !data.black) ||
        (data.black === cookie && searchParams.get("color") === "black")
      ) {
        setYourside("black");
        await updateDoc(docRef, {
          black: cookie,
        });
      }

      if (data.black && data.white && !gameover) {
        cookies.set("ingame", url);
        updateDoc(docRef,{
          gamestarted:true
        })
        setgamestarted(true);
      }

      if (Array.isArray(data.chessboard)) {
        setchessboard(data.chessboard);
        setcolortomove(data.colortomove);
        setblackkingplace(data.blackkingplaceonchessboard);
        setwhitekingplace(data.whitekingplaceonchessboard);
        setgameover(data.gameover);
        if (data.deadblackpieces.length > deadblackpieces) {
          setdeadblackpieces(data.deadblackpieces);
        }

        if (data.deadwhitepieces > deadwhitepieces) {
          setdeadwhitepieces(data.deadwhitepieces);
        }
        setpassinginbeating(data.beatinginpassing);
        setpassinginbeating(data.beatinginpassing);
      }
    }
  };

  const [gameover, setgameover] = React.useState(false);


  React.useEffect(() => {
    if (gameover!==false) {
      updateDoc(docRef, {
        gameover: gameover,
      });
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameover]);

  function castle(index) {
    const colorofenemy = colortomove === "white" ? "black" : "white";

    if (colortomove === "black") {
      if (index === 6) {
        setchessboard((prev) => {
          let [...table] = prev;

          table[6] = {
            ...table[6],
            takenby: ["black", "King"],
            move: table[4].move,
          };
          table[5] = {
            ...table[5],
            takenby: table[7].takenby,
            move: table[7].move,
          };
          table[7] = { ...table[7], takenby: false };
          table[4] = { ...table[4], takenby: false };
          return table;
        });
      } else
        setchessboard((prev) => {
          let [...table] = prev;

          table[2] = {
            ...table[2],
            takenby: ["black", "King"],
            move: table[4].move,
          };
          table[3] = {
            ...table[3],
            takenby: table[0].takenby,
            move: table[0].move,
          };
          table[0] = { ...table[0], takenby: false };
          table[4] = { ...table[4], takenby: false };
          return table;
        });

      setblackkingplace(index);
    }

    if (colortomove === "white") {
      if (index === 62) {
        setchessboard((prev) => {
          let [...table] = prev;

          table[62] = {
            ...table[62],
            takenby: ["white", "King"],
            move: table[60].move,
          };
          table[61] = {
            ...table[61],
            takenby: table[63].takenby,
            move: table[63].move,
          };
          table[63] = { ...table[63], takenby: false };
          table[60] = { ...table[60], takenby: false };
          return table;
        });
      } else
        setchessboard((prev) => {
          let [...table] = prev;

          table[58] = {
            ...table[58],
            takenby: ["white", "King"],
            move: table[60].move,
          };
          table[59] = {
            ...table[59],
            takenby: table[56].takenby,
            move: table[56].move,
          };
          table[56] = { ...table[56], takenby: false };
          table[60] = { ...table[60], takenby: false };
          return table;
        });

      setwhitekingplace(index);
    }

    setfieldswhereplayercanmove([]);
    setpiecethatismoving(null);
    setcolortomove(colorofenemy);
    setcastling([false]);
    setupdate((prev) => prev + 1);
  }

  function changingtoanotherpiece(piece) {
    let newboard = [...changing.board];
    newboard[changing.to] = {
      ...newboard[changing.to],
      takenby: [colortomove, piece],
    };
    setchessboard((prev) => {
      return newboard;
    });
    setcolortomove((prev) => {
      const toreturn = prev === "white" ? "black" : "white";
      return toreturn;
    });
    setchanging({ bull: false });
    setupdate((prev) => prev + 1);
    return null;
  }

  const A = 1;
  const B = 2;
  const C = 3;
  const D = 4;
  const E = 5;
  const F = 6;
  const G = 7;
  const H = 8;
  const [check, setcheck] = React.useState(false);
  const [changing, setchanging] = React.useState(false);
  const [Playercanmovethere, setfieldswhereplayercanmove] = React.useState([]);
  const [piecethatismoving, setpiecethatismoving] = React.useState();
  const [moveshistory, setmoveshistory] = React.useState([]);
  ////stateofnumberofmovesinthegame
  const [colortomove, setcolortomove] = React.useState("white");
  ///State of current player to move
  const [passingbeating, setpassinginbeating] = React.useState(false);
  const [whitekingplaceonchessboard, setwhitekingplace] = React.useState(60);
  ///State of white king location on the chessboard. It will be used to to check if king
  // is in check after player move and not allow player to move there if is in check.
  // The same goes with black king below.
  const [blackkingplaceonchessboard, setblackkingplace] = React.useState(4);

  ///This is State of chessbord on the begining of the game It will be changing with players actions ///
  // const [chessboard, setchessboard] = React.useState([
  const [castling, setcastling] = React.useState([false]);

  React.useEffect(() => {
    if (gamestarted) {

      setIsRunning(colortomove);
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colortomove, gamestarted]);

  const [chessboard, setchessboard] = React.useState([
    { name: [A, 8], takenby: ["black", "Rook"], move: 0 },
    { name: [B, 8], takenby: ["black", "Knight"] },
    { name: [C, 8], takenby: ["black", "Bishop"] },
    { name: [D, 8], takenby: ["black", "Queen"] },
    { name: [E, 8], takenby: ["black", "King"], move: 0 },
    { name: [F, 8], takenby: ["black", "Bishop"] },
    { name: [G, 8], takenby: ["black", "Knight"] },
    { name: [H, 8], takenby: ["black", "Rook"], move: 0 },
    { name: [A, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [B, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [C, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [D, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [E, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [F, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [G, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [H, 7], takenby: ["black", "Pawn"], move: 0 },
    { name: [A, 6], takenby: false },
    { name: [B, 6], takenby: false },
    { name: [C, 6], takenby: false },
    { name: [D, 6], takenby: false },
    { name: [E, 6], takenby: false },
    { name: [F, 6], takenby: false },
    { name: [G, 6], takenby: false },
    { name: [H, 6], takenby: false },
    { name: [A, 5], takenby: false },
    { name: [B, 5], takenby: false },
    { name: [C, 5], takenby: false },
    { name: [D, 5], takenby: false },
    { name: [E, 5], takenby: false },
    { name: [F, 5], takenby: false },
    { name: [G, 5], takenby: false },
    { name: [H, 5], takenby: false },
    { name: [A, 4], takenby: false },
    { name: [B, 4], takenby: false },
    { name: [C, 4], takenby: false },
    { name: [D, 4], takenby: false },
    { name: [E, 4], takenby: false },
    { name: [F, 4], takenby: false },
    { name: [G, 4], takenby: false },
    { name: [H, 4], takenby: false },
    { name: [A, 3], takenby: false },
    { name: [B, 3], takenby: false },
    { name: [C, 3], takenby: false },
    { name: [D, 3], takenby: false },
    { name: [E, 3], takenby: false },
    { name: [F, 3], takenby: false },
    { name: [G, 3], takenby: false },
    { name: [H, 3], takenby: false },
    { name: [A, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [B, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [C, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [D, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [E, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [F, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [G, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [H, 2], takenby: ["white", "Pawn"], move: 0 },
    { name: [A, 1], takenby: ["white", "Rook"], move: 0 },
    { name: [B, 1], takenby: ["white", "Knight"] },
    { name: [C, 1], takenby: ["white", "Bishop"] },
    { name: [D, 1], takenby: ["white", "Queen"] },
    { name: [E, 1], takenby: ["white", "King"], move: 0 },
    { name: [F, 1], takenby: ["white", "Bishop"] },
    { name: [G, 1], takenby: ["white", "Knight"] },
    { name: [H, 1], takenby: ["white", "Rook"], move: 0 },
  ]);

  const [chessboardbefore, setchessboardbefore] = React.useState([
    ...chessboard,
  ]);
  const [deadwhitepieces, setdeadwhitepieces] = React.useState([]);
  const [deadblackpieces, setdeadblackpieces] = React.useState([]);
  React.useEffect(
    () => {
      if (moveshistory.length === 0) {
        return;
      }
      const indexofkingtocheck =
        colortomove === "white"
          ? whitekingplaceonchessboard
          : blackkingplaceonchessboard;

      const field0 = chessboard[indexofkingtocheck].name[0];

      const field1 = chessboard[indexofkingtocheck].name[1];

      ///Function to display all dead pieces
      chessboard.map((each, index) => {
        if (
          colortomove === "black" &&
          chessboard[index]?.takenby[0] === "white" &&
          chessboardbefore[index]?.takenby[0] === "black"
        ) {
          setdeadblackpieces((prev) => {
            return [...prev, { piece: chessboardbefore[index].takenby[1] }];
          });
        }
        if (
          colortomove === "white" &&
          chessboard[index]?.takenby[0] === "black" &&
          chessboardbefore[index]?.takenby[0] === "white"
        ) {
          setdeadwhitepieces((prev) => {
            return [...prev, { piece: chessboardbefore[index].takenby[1] }];
          });
        }
      });

      setchessboardbefore([...chessboard]);

      const checkifkingisincheck = checkifkingischecked(
        colortomove,
        field0,
        field1,
        chessboard
      );

      if (checkifkingisincheck.ischecked.length >= 1) {
        setcheck(colortomove);
        ///Function that finds out if king is in  / check at the begining of your move///
        const movesforking = movesforrking(
          colortomove,
          field0,
          field1,
          chessboard,
          passingbeating
        );

        if (movesforking.table.length === 0) {
          const protections = findprotection(
            checkifkingisincheck.movestoprotect,
            colortomove,
            chessboard,
            indexofkingtocheck
          );
          /// If king doessnt have any moves we check his protections///

          if (protections === false) {
            setgameover(Yourside);
          }
        }
      }

      return;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [chessboard] // Array of dependencies
  );

  function findmoves(color, piece, fieldname0, fieldname1, chessboard, index) {
    //This function is finding moves for piece that is chosen by player//

    if (
      color !== colortomove ||
      colortomove !== Yourside ||
      !gamestarted ||
      gameover
    ) {
      return;

      ///You cannot move if it is not your turn//
    }

    const obj = findcorrectpiece(
      color,
      piece,
      fieldname0,
      fieldname1,
      chessboard,
      index,
      passingbeating
    );

    if (
      chessboard[obj.index].takenby[1] === "King" &&
      chessboard[obj.index].move === 0 &&
      !check
    ) {
      let cast = [];

      if (
        chessboard[obj.index - 1]?.takenby === false &&
        chessboard[obj.index - 2]?.takenby === false &&
        chessboard[obj.index - 3]?.takenby === false &&
        chessboard[obj.index - 4]?.move === 0 &&
        chessboard[obj.index - 4]?.takenby[1] === "Rook" &&
        checkifkingischecked(
          colortomove,
          chessboard[obj.index - 1].name[0],
          chessboard[obj.index - 1].name[1],
          chessboard
        ).ischecked.length === 0 &&
        checkifkingischecked(
          colortomove,
          chessboard[obj.index - 2].name[0],
          chessboard[obj.index - 2].name[1],
          chessboard
        ).ischecked.length === 0
      ) {
        cast.push(obj.index - 2);
      }

      if (
        chessboard[obj.index + 1]?.takenby === false &&
        chessboard[obj.index + 2]?.takenby === false &&
        chessboard[obj.index + 3]?.move === 0 &&
        chessboard[obj.index + 3]?.takenby[1] === "Rook" &&
        checkifkingischecked(
          colortomove,
          chessboard[obj.index + 1].name[0],
          chessboard[obj.index + 1].name[1],
          chessboard
        ).ischecked.length === 0 &&
        checkifkingischecked(
          colortomove,
          chessboard[obj.index + 2].name[0],
          chessboard[obj.index + 2].name[1],
          chessboard
        ).ischecked.length === 0
      ) {
        cast.push(obj.index + 2);
      }
      if (cast.length > 0) {
        setcastling(cast);
      }
    } else setcastling([false]);

    setfieldswhereplayercanmove(obj.table);
    ///Setting state of possible moves for player with moves returned from function

    setpiecethatismoving(obj.index);
    ///Setting state of piece that is moving

    return;
  }

  async function movepiece(indexwhereismoving) {
    if (indexwhereismoving === piecethatismoving) {
      ///Player can chose another piece after clicking on the moving piece again.
      setcastling([false]);
      setfieldswhereplayercanmove([]);
      setpiecethatismoving(null);
      return;
    }

    if (castling.includes(indexwhereismoving)) {
      castle(indexwhereismoving);
    }

    setfieldswhereplayercanmove("");

    setchessboard((prev) => {
      ///Chessboard state is changing after move

      const table = [...prev];
      // table is previous state of chessboard table
      const temp = table[piecethatismoving];

      // temporary variable of previous field of piece that is moving
      const temp2 = table[indexwhereismoving];
      /// temporary variable of field where piece is going.

      if (
        colortomove === "white" &&
        table[indexwhereismoving].takenby === false &&
        table[indexwhereismoving + 8]?.takenby[1] === "Pawn" &&
        table[indexwhereismoving + 8]?.takenby[0] !== colortomove &&
        table[piecethatismoving]?.takenby[1] === "Pawn"
      ) {
        table[indexwhereismoving + 8].takenby = {
          ...table[indexwhereismoving + 8],
          takenby: false,
        };

        if (colortomove === "white") {
          setdeadblackpieces((prev) => {
            return [...prev, { piece: "Pawn" }];
          });
        }

        if (colortomove === "black") {
          setdeadwhitepieces((prev) => {
            return [...prev, { piece: "Pawn" }];
          });
        }
      }
      ////Beating in passing logic///

      if (
        colortomove === "black" &&
        table[indexwhereismoving].takenby === false &&
        table[indexwhereismoving - 8]?.takenby[1] === "Pawn" &&
        table[indexwhereismoving - 8]?.takenby[0] !== colortomove &&
        table[piecethatismoving]?.takenby[1] === "Pawn"
      ) {
        table[indexwhereismoving - 8].takenby = {
          ...table[indexwhereismoving + 8],
          takenby: false,
        };
      }

      table[indexwhereismoving] =
        table[piecethatismoving].takenby[1] === "Pawn" ||
        table[piecethatismoving].takenby[1] === "Rook" ||
        table[piecethatismoving].takenby[1] === "King"
          ? { ...temp2, takenby: temp.takenby, move: temp.move + 1 }
          : { ...temp2, takenby: temp.takenby };

      table[piecethatismoving] = { ...temp, takenby: false };
      //// Field from where piece is going and where is going switch places.
      /// but takenby propery in field from where piece is going will always be
      // false and takenby property in new field of moving piece will always be that piece.

      let kingtomove =
        colortomove === "white"
          ? whitekingplaceonchessboard
          : blackkingplaceonchessboard;

      if (prev[piecethatismoving].takenby[1] === "King") {
        kingtomove = indexwhereismoving;
      }

      const field0 = chessboard[kingtomove].name[0];
      const field1 = chessboard[kingtomove].name[1];
      const checkifkingisincheck = checkifkingischecked(
        colortomove,
        field0,
        field1,
        table
      );

      if (checkifkingisincheck.ischecked.length >= 1) {
        return prev;
      } else if (
        (prev[piecethatismoving].takenby[1] === "Pawn" &&
          prev[indexwhereismoving].name[1] === 1) ||
        (prev[piecethatismoving].takenby[1] === "Pawn" &&
          prev[indexwhereismoving].name[1] === 8)
      ) {
        setchanging({
          bull: true,
          board: table,
          from: piecethatismoving,
          to: indexwhereismoving,
        });
        return prev;

        ///If pawn is on changing place Player have to chose piece
        /// in order for the game to  to continue
      }

      if (prev[piecethatismoving].takenby[1] === "King") {
        if (colortomove === "black") {
          setblackkingplace(indexwhereismoving);
        }

        if (colortomove === "white") {
          setwhitekingplace(indexwhereismoving);
        }
      }

      setcastling([false]);
      let beatinginpassing = false;
      if (check !== false) {
        setcheck(false);
      }
      if (
        (table[indexwhereismoving].move === 1) &
          (table[indexwhereismoving]?.takenby[1] === "Pawn") &&
        [4, 5].includes(table[indexwhereismoving].name[1])
      ) {
        beatinginpassing = indexwhereismoving;
      }
      setpassinginbeating(beatinginpassing);

      setmoveshistory((prev) => {
        let history = prev;
        let newhistory = [
          ...history,
          {
            from: piecethatismoving,
            to: indexwhereismoving,
            piece: [chessboard[piecethatismoving].takenby],
          },
        ];

        return newhistory;
      });

      setcolortomove((prev) => {
        const toreturn = prev === "white" ? "black" : "white";
        return toreturn;
      });

      setIsRunning((prev) => {
        const toreturn = prev === "white" ? "black" : "white";
        return toreturn;
      });

      setupdate((prev) => {
        return prev + 1;
      });

      return table;
    });

    return;
  }

  let fromwhitetoblack = true;
  let color;
  let Ifgameisoveer =
    gameover === "white"
      ? "Koniec gry wygrały Czarne"
      : "Koniec gry wygrały Białe";
  const classnamechessboard =
    Yourside === "black"
      ? "grid border-solid border-2 border-indigo-600 w-auto h-auto lg:h-[600px] lg:w-[600px] h-[450px] w-5/6 md:h-[450px] md:w-full rounded lg:col-start-1 lg:col-span-2   grid-cols-8 grid-rows-8 md:col-start-1 md:col-span-2 auto-rows-fr col-span-full m-auto rotate-180"
      : "grid border-solid border-2 border-indigo-600 w-auto h-auto lg:h-[600px] lg:w-[600px] h-[450px] w-5/6 md:h-[450px] md:w-full rounded lg:col-start-1 lg:col-span-2   grid-cols-8 grid-rows-8 md:col-start-1 md:col-span-2 auto-rows-fr col-span-full m-auto  ";
  const secondgridclassname = "grid gap-10 m-auto col-span-full lg:col-span-2";
  return (
    <>
      <div className="grid grid-cols-4">
        <div class={classnamechessboard}>
          {chessboard.map((each, index) => {
            let i = index + 1;

            if (fromwhitetoblack) {
              color = i % 2 == 0 ? "#4caf50" : "#f3e5ab";
            }

            if (!fromwhitetoblack) {
              color = i % 2 == 0 ? "#f3e5ab" : "#4caf50";
            }

            if (i % 8 == 0) {
              fromwhitetoblack = !fromwhitetoblack;
            }
            const Icon = each.takenby
              ? findcorrecticon(
                  each.takenby[0],
                  each.takenby[1],
                  index === piecethatismoving,
                  Yourside
                )
              : false;

            if (Playercanmovethere?.includes(index)) {
              color = "red";
            }

            if (castling.includes(index)) {
              color = "red";
            }
            if (
              !Playercanmovethere?.includes(index) &&
              index !== piecethatismoving
            ) {
              return (
                <div
                  key={index}
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: color,
                    display: "grid",
                    border: "0.5px solid black",
                  }}
                  onClick={() => {
                    if (castling.includes(index)) {
                      castle(index);
                    }
                    return null;
                  }}
                >
                  {Icon && (
                    <div
                      onClick={() => {
                        if (changing?.bull !== true) {
                          findmoves(
                            each.takenby[0],
                            each.takenby[1],
                            each.name[0],
                            each.name[1],
                            chessboard,
                            index
                          );
                        }
                      }}
                      style={{ margin: "auto" }}
                    >
                      {" "}
                      {Icon}{" "}
                    </div>
                  )}
                </div>
              );
            } else
              return (
                <div
                  key={index}
                  onClick={() => {
                    if (changing?.bull !== true) {
                      movepiece(index);
                    }
                  }}
                  style={{
                    border: "0.5px solid black",
                    height: "100%",
                    width: "100%",
                    backgroundColor: color,
                    display: "grid",
                  }}
                >
                  {Icon && <div style={{ margin: "auto" }}> {Icon} </div>}
                  {changing.bull && (
                    <Dropdown
                      color={colortomove}
                      onklikfunct={changingtoanotherpiece}
                    />
                  )}
                </div>
              );
          })}
        </div>
        <div className="lg:hidden md:hidden block">
          <br></br>
        </div>

        {!gameover && (
          <div className="grid lg:col-start-3 md:col-start-3 col-span-full lg:row-span-full  m-auto">
            {!gamestarted && (
              <div className="grid col-span-full m-auto text-center">
                <h1>Oczekiwanie na drugiego gracza</h1> <Spinner />
              </div>
            )}

            {gamestarted && colortomove !== Yourside && (
              <div className="grid">
                Oczekiwanie na ruch przeciwnika
                <Spinner />
              </div>
            )}

            {gamestarted && colortomove == Yourside && (
              <h1 className="col-span-full m-auto text-center">Twój Ruch</h1>
            )}
            <div className="flex gap-10  lg:row-span-full  m-auto   ">
              <Stoperwhite
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                gamestarted={moveshistory.length}
                setgameover={setgameover}
              />

              <StoperBlack
                setIsRunning={setIsRunning}
                isRunning={isRunning}
                setgameover={setgameover}
              />
            </div>
            <br></br>

            {gamestarted && (
              <Button
                color="danger"
                variant="bordered"
                onClick={() => {
                  setupdate((prev) => {
                    return prev + 1;
                  });
                  setgameover((prev) => {
                    return Yourside;
                  });
                }}
              >
                Poddaj się
              </Button>
            )}

            <br></br>
            <div className="flex  gap-1">
              {deadblackpieces.map((each, index) => {
                return (
                  <div className="bg-white rounded" key={index}>
                    {" "}
                    <Smallicon piece={each.piece} color={"black"} />{" "}
                  </div>
                );
              })}
            </div>
            <br></br>
            <div className="flex">
              {deadwhitepieces.map((each, index) => {
                return (
                  <div className="bg-white rounded" key={index}>
                    {" "}
                    <Smallicon piece={each.piece} color={"white"} />{" "}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      {  gameover && <Gameover msg={Ifgameisoveer} />}
      </div>
<div>{`${isLeft}`}</div>
    </>
  );
}
