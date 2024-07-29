"use client";

import { BOARD_WIDTH, getSquarePosition, SQUARE_SIZE } from "@/utils/helper";
import { MakeSound } from "@/utils/sound";
import { Chess, Square } from "chess.js";
import { useState } from "react";
import { Chessboard } from "react-chessboard";

export default function ChessBoard() {
  const [game, setGame] = useState(new Chess());
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [targetSquare, setTargetSquare] = useState("");

  function makeAMove(move: { from: string; to: string; promotion?: string }) {
    const gameCopy = new Chess(game.fen()); // Create a new Chess instance with the current game state
    const result = gameCopy.move(move);

    if (result) {
      const isInCheck = gameCopy.inCheck();
      setGame(gameCopy); // Only set the game state if the move was valid
      new MakeSound(gameCopy); // Play the sound only if the move is valid
    }

    return result; // null if the move was illegal, the move object if the move was legal
  }
  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    });

    // Illegal move
    if (move === null) return false;
    setValidMoves([]); // Clear valid moves after a move is made
    return true;
  }

  function onSquareClick(square: Square) {
    validMoves.some((vm) => {
      if (vm === square) {
        onDrop(targetSquare, square);
        return true;
      }
      return false;
    });
  }

  function onPieceClick(piece: string, square: Square) {
    const moves = game.moves({ square, verbose: true });
    // Remove duplicate moves
    const uniqueMoves = moves.filter(
      (move, index, self) => index === self.findIndex((m) => m.to === move.to)
    );
    const validMoves = uniqueMoves.map((move) => move.to);
    setTargetSquare(square);
    setValidMoves(validMoves);
  }

  return (
    <div style={{ position: "relative" }}>
      <Chessboard
        boardWidth={BOARD_WIDTH} // Set the board width to 600 pixels
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        onPieceClick={onPieceClick}
        customSquareStyles={{}}
      />
      {validMoves.map((square) => {
        const { top, left } = getSquarePosition(square);
        return (
          <div
            key={square}
            style={{
              position: "absolute",
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
