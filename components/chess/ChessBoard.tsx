"use client";
import { BOARD_WIDTH, getSquarePosition, SQUARE_SIZE } from "@/utils/helper";

import { Chessboard } from "react-chessboard";

import { useGameContext } from "./ChessContextProvider";

export default function ChessBoard() {
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

  return (
    <div className="relative min-h-[650px] ">
      <Chessboard
        boardWidth={BOARD_WIDTH}
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        onPieceClick={onPieceClick}
        customSquareStyles={{}}
        // customDarkSquareStyle={{ backgroundColor: "#0e7490" }}
        // customLightSquareStyle={{ backgroundColor: "#cbd5e1" }}
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
              width: "16px",
              height: "16px",
              backgroundColor: "white",
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
