"use client";
import { BOARD_WIDTH, getSquarePosition, SQUARE_SIZE } from "@/utils/helper";
import { MakeSound } from "@/utils/sound";
import { Chess, Move, Square } from "chess.js";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";

type KingStatus = "W" | "L" | null;

interface KingPieceProps {
  color: string;
  status: KingStatus;
  squareWidth: number;
}

const KingPiece = ({ color, status, squareWidth }: KingPieceProps) => {
  const kingColor = status === "L" ? "#c2410c" : "#15803d";

  return (
    <div
      style={{ position: "relative", width: squareWidth, height: squareWidth }}
    >
      <svg viewBox="1 1 43 43" width="82.5" height="82.5" className="block">
        <g>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="45"
            height="45"
          >
            <g
              style={{
                fill: kingColor,
                stroke: "rgb(0, 0, 0)",
                strokeWidth: 1.5,
              }}
            >
              <path d="M 22.5,11.63 L 22.5,6" />
              <path d="M 20,8 L 25,8" />
              <path d="M 22.5,25 C 22.5,25 27,17.5 25.5,14.5 C 25.5,14.5 24.5,12 22.5,12 C 20.5,12 19.5,14.5 19.5,14.5 C 18,17.5 22.5,25 22.5,25" />
              <path d="M 12.5,37 C 18,40.5 27,40.5 32.5,37 L 32.5,30 C 32.5,30 41.5,25.5 38.5,19.5 C 34.5,13 25,16 22.5,23.5 L 22.5,27 L 22.5,23.5 C 20,16 10.5,13 6.5,19.5 C 3.5,25.5 12.5,30 12.5,30 L 12.5,37" />
              <path d="M 12.5,30 C 18,27 27,27 32.5,30" />
              <path d="M 12.5,33.5 C 18,30.5 27,30.5 32.5,33.5" />
              <path d="M 12.5,37 C 18,34 27,34 32.5,37" />
            </g>
          </svg>
        </g>
      </svg>
      {status && (
        <div
          style={{
            position: "absolute", // Explicit type assertion
            top: "0",
            left: "80%",
            transform: "translateX(-50%)",
            fontSize: "16px",
            fontWeight: "bold",
            color,
          }}
        >
          {status}
        </div>
      )}
    </div>
  );
};

export default function ChessBoard({ socket }: { socket: WebSocket }) {
  const [game, setGame] = useState<Chess>(new Chess());
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [targetSquare, setTargetSquare] = useState<string>("");
  const [applyCustomStyles, setApplyCustomStyles] = useState(true);

  function getKingStatus(kingColor: "w" | "b"): KingStatus {
    if (game.isGameOver()) {
      const winner =
        game.isCheckmate() && game.turn() === kingColor ? "L" : "W";
      return winner;
    }
    return null;
  }

  function makeAMove(move: {
    from: string;
    to: string;
    promotion?: string;
  }): Move | null {
    const gameCopy = new Chess(game.fen());
    const result = gameCopy.move(move);
    console.log(move);
    socket.send(
      JSON.stringify({
        data: move,
      })
    );
    if (result) {
      setGame(gameCopy);
      new MakeSound(gameCopy);
    }
    return result;
  }

  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    setValidMoves([]);
    return true;
  }

  function onSquareClick(square: Square): void {
    if (validMoves.includes(square)) {
      onDrop(targetSquare, square);
    }
  }

  function onPieceClick(piece: string, square: Square): void {
    const moves = game.moves({ square, verbose: true });
    //remove dublicate move
    const uniqueMoves = moves.filter(
      (move, index, self) => index === self.findIndex((m) => m.to === move.to)
    );
    setValidMoves(uniqueMoves.map((move) => move.to));
    setTargetSquare(square);
  }

  const kingCustomePieces = {
    wK: ({ squareWidth }: { squareWidth: number }) => (
      <KingPiece
        color="black"
        status={getKingStatus("w")}
        squareWidth={squareWidth}
      />
    ),
    bK: ({ squareWidth }: { squareWidth: number }) => (
      <KingPiece
        color="white"
        status={getKingStatus("b")}
        squareWidth={squareWidth}
      />
    ),
  };

  useEffect(() => {
    if (socket !== null) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        makeAMove(data);
      };
    }
  }, []);

  useEffect(() => {
    if (game.isGameOver()) {
      const timer = setTimeout(() => setApplyCustomStyles(true), 300);
      return () => clearTimeout(timer); // Cleanup on component unmount or game restart
    } else {
      setApplyCustomStyles(false);
    }
  }, [game]);

  return (
    <div style={{ position: "relative" }}>
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
