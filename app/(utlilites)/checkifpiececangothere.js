

export  function checkifcangothere(field,chessboard,color,colorofenemy) {






    let bull = field !== -1;
    let changeifstillcangothisdirection = false
                  ;
    let push = false;
    if (
      chessboard[field]?.takenby[0] !== color &&
      bull === true &&
      chessboard[field]?.takenby[0] !== colorofenemy
    ) {
      push = true;
    }

    if (bull && chessboard[field]?.takenby[0] === colorofenemy) {
      push = true;
      changeifstillcangothisdirection = true;
    }
    if (bull && chessboard[field]?.takenby[0] === color) {
      changeifstillcangothisdirection = true;
    }

    return {
      cangothere: push,
      changeifstillcangothisdirection: changeifstillcangothisdirection,
      index:field
    };
  }