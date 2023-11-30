import { FaChessBishop,FaChessKing,FaChessQueen,FaChessPawn,FaChess,FaChessRook,
FaChessKnight } from 'react-icons/fa'

import { FaRegChessBishop,FaRegChessKnight,FaRegChessPawn,FaRegChessQueen,FaRegChessKing,FaRegChessRook, } from 'react-icons/fa6'

import React from 'react'

export default function Smallicon(props) {



    if(props.piece==="Knight"){

        if(props.color==="black"){
            return <FaChessKnight color={"black"}className='h-[30px] w-[30px]'/>
        }
  
        if(props.color==="white"){
            return <FaRegChessKnight color={"black"}className='h-[30px] w-[30px]'/>
        }
  
          
    }

    if(props.piece==="Queen"){
        if(props.color==="black"){
            return <FaChessQueen color={"black"}className='h-[30px] w-[30px]'/>
        }

        if(props.color==="white"){
            return <FaRegChessQueen color={"black"}className='h-[30px] w-[30px]'/>
        }
  
    }
    if(props.piece==="Bishop"){
        if(props.color==="black"){
            return <FaChessBishop color={"black"}className='h-[30px] w-[30px]'/>
        }

        if(props.color==="white"){
            return <FaRegChessBishop color={"black"}className='h-[30px] w-[30px]'/>
        }
  
          
    }
    if(props.piece==="Pawn"){
        if(props.color==="black"){
            return <FaChessPawn color={"black"}className='h-[30px] w-[30px]'/>
        }
        if(props.color==="white"){
            return <FaRegChessPawn color={"black"}className='h-[30px] w-[30px]'/>
        }
          
    }
    if(props.piece==="Rook"){
        if(props.color==="white"){
            return <FaChessRook color={"black"}className='h-[30px] w-[30px]'/>
        }

        if(props.color==="white"){
            return <FaRegChessRook color={"black"}className='h-[30px] w-[30px]'/>
        }
          
    }


}
