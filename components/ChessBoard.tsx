"use client";
import { strict } from "assert";
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
      setGame(gameCopy); // Only set the game state if the move was valid
    }
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    // Illegal move
    if (move === null) return false;
    setValidMoves([]); // Clear valid moves after a move is made
    return true;
  }

  function onSquareClick(square: Square) {
    console.log(square);
    validMoves.some((vm) => {
      if (vm === square) {
        console.log(true);
        onDrop(targetSquare, square);
      }
      return false;
    });
  }

  function onPieceClick(piece: string, square: Square) {
    // console.log(piece, square);
    const moves = game.moves({ square, verbose: true });
    const validMoves = moves.map((move) => move.to);
    console.log(validMoves);
    setTargetSquare(square);
    setValidMoves(validMoves);
  }

  return (
    <div style={{ position: "relative" }}>
      <Chessboard
        boardWidth={400}
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

        return (
          <div
            key={square}
            style={{
              position: "absolute",
              top: `${rankIndex * 50 + 25}px`, // Position the dot in the center of the square
              left: `${fileIndex * 50 + 25}px`,
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
