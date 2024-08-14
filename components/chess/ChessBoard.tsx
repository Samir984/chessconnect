"use client";
import { Chessboard } from "react-chessboard";
import { useGameContext } from "./ChessContextProvider";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CustomeKingPieces, { KingStatus } from "./CustomeKingPieces";

export default function ChessBoard() {
  const [boardWidth, setBoardWidth] = useState<number>(660);
  let squareSize = boardWidth / 8;
  const {
    game,
    validMoves,
    applyCustomStyles,
    onDrop,
    onSquareClick,
    onPieceClick,
  } = useGameContext();

  function getKingStatus(kingColor: "w" | "b"): KingStatus {
    if (game.isGameOver()) {
      if (game.isDraw()) {
        toast.success("game is draw");
        return "D";
      }
      const winner =
        game.isCheckmate() && game.turn() === kingColor ? "L" : "W";
      return winner;
    }
    return null;
  }

  function getSquarePosition(square: string): { top: number; left: number } {
    const file = square[0];
    const rank = parseInt(square[1], 10);
    const fileIndex = "abcdefgh".indexOf(file);
    const rankIndex = 8 - rank;
    return {
      top: rankIndex * squareSize,
      left: fileIndex * squareSize,
    };
  }

  const kingCustomePieces = {
    wK: ({ squareWidth }: { squareWidth: number }) => (
      <CustomeKingPieces
        color="white"
        status={getKingStatus("w")}
        squareWidth={squareWidth}
      />
    ),
    bK: ({ squareWidth }: { squareWidth: number }) => (
      <CustomeKingPieces
        color="black"
        status={getKingStatus("b")}
        squareWidth={squareWidth}
      />
    ),
  };

  useEffect(() => {
    const updateBoardWidth = () => {
      const width = window.innerWidth;

      if (width < 640) {
        setBoardWidth(350);
      } else if (width < 768) {
        setBoardWidth(450);
      } else if (width < 1024) {
        setBoardWidth(550);
      } else {
        setBoardWidth(660);
      }
    };

    updateBoardWidth();

    window.addEventListener("resize", updateBoardWidth);

    return () => window.removeEventListener("resize", updateBoardWidth);
  }, []);

  return (
    <div className="relative" style={{ width: `${boardWidth}px` }}>
      <Chessboard
        boardWidth={boardWidth}
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
              top: `${top + squareSize / 2}px`,
              left: `${left + squareSize / 2}px`,
              width: `${squareSize / 6}px`,
              height: `${squareSize / 6}px`,
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
