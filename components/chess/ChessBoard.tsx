"use client";
import { Chessboard } from "react-chessboard";
import { useGameContext } from "./ChessContextProvider";
import { useEffect, useState } from "react";

export default function ChessBoard() {
  const [BOARD_WIDTH, setBOARD_WIDTH] = useState(660);
  let SQUARE_SIZE = BOARD_WIDTH / 8;

  function getSquarePosition(square: string): {
    top: number;
    left: number;
  } {
    const file = square[0];
    const rank = parseInt(square[1], 10);
    const fileIndex = "abcdefgh".indexOf(file);
    const rankIndex = 8 - rank;
    return {
      top: rankIndex * SQUARE_SIZE,
      left: fileIndex * SQUARE_SIZE,
    };
  }

  const {
    game,
    side,
    validMoves,
    targetSquare,
    applyCustomStyles,
    setSide,
    makeAMove,
    onDrop,
    onSquareClick,
    onPieceClick,
    kingCustomePieces,
  } = useGameContext();

  useEffect(() => {
    const updateBoardWidth = () => {
      console.log(BOARD_WIDTH, window?.outerWidth);

      if (window?.outerWidth < 640) {
        setBOARD_WIDTH(360);
      } else if (window?.outerWidth < 768) {
        setBOARD_WIDTH(450);
      } else if (window?.outerWidth < 1024) {
        setBOARD_WIDTH(600);
      } else {
        setBOARD_WIDTH(660);
      }
    };

    updateBoardWidth();

    window?.addEventListener("resize", updateBoardWidth);

    return () => window?.removeEventListener("resize", updateBoardWidth);
  }, [BOARD_WIDTH]);

  return (
    <div className="relative w-[360px] phone:w-[450px] tablet:w-[600px] laptop:w-[660px] ">
      <Chessboard
        boardWidth={BOARD_WIDTH}
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        onPieceClick={onPieceClick}
        customSquareStyles={{}}
        customDarkSquareStyle={{ backgroundColor: "#0e7490" }}
        customLightSquareStyle={{ backgroundColor: "#cbd5e1" }}
        customPieces={applyCustomStyles ? kingCustomePieces : undefined}
      />
      {validMoves.map((square) => {
        const { top, left } = getSquarePosition(square);
        return (
          <div
            key={square}
            style={{
              position: "absolute" as "absolute", // Explicit type assertion
              top: `${top + SQUARE_SIZE / 2}px`,
              left: `${left + SQUARE_SIZE / 2}px`,
              width: `${SQUARE_SIZE / 6}px`,
              height: `${SQUARE_SIZE / 6}px`,
              backgroundColor: "yellow",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
}
