"use client";

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
    console.log(gameCopy.inCheck());
    if (result) {
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
    // buf: Filter out duplicate moves
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
        boardWidth={600} // Set the board width to 600 pixels
        position={game.fen()}
        onPieceDrop={onDrop}
        onSquareClick={onSquareClick}
        onPieceClick={onPieceClick}
        customSquareStyles={{}}
      />
      {validMoves.map((square) => {
        const [file, rank] = square.split("");
        const fileIndex = "abcdefgh".indexOf(file);
        const rankIndex = 8 - parseInt(rank, 10);
        console.log(`${file}-${rank}-random`, validMoves);
        return (
          <div
            key={`${file}-${rank}`}
            style={{
              position: "absolute",
              top: `${rankIndex * 75 + 37.5}px`, // Adjust based on new square size
              left: `${fileIndex * 75 + 37.5}px`, // Adjust based on new square size
              width: "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: "50%",
              transform: "translate(-50%, -50%)", // Center the dot
              pointerEvents: "none", // To ensure the dot doesn't interfere with piece movement
            }}
          />
        );
      })}
    </div>
  );
}
