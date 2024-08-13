"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Chess, Move, Square } from "chess.js";
import toast from "react-hot-toast";
import { MakeSound } from "@/utils/sound";
import CustomeKingPieces, { KingStatus } from "./CustomeKingPieces";
import { useSocket } from "@/provider/SocketProvider";

interface ChessContextType {
  game: Chess;
  side: null | "B" | "W" | "noMove";
  validMoves: string[];
  targetSquare: string;
  applyCustomStyles: boolean;
  setSide: (side: null | "B" | "W" | "noMove") => void;
  makeAMove: (
    move: {
      from: string;
      to: string;
      promotion?: string;
    },
    send: boolean
  ) => Move | null;
  onDrop: (sourceSquare: string, targetSquare: string) => boolean;
  onSquareClick: (square: string) => void;
  onPieceClick: (piece: string, square: Square) => void;
  kingCustomePieces: any;
}

const ChessContext = createContext<ChessContextType | undefined>(undefined);

export default function ChesstContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { socket, joinMessage } = useSocket();
  const [side, setSide] = useState<null | "B" | "W" | "noMove">(null);
  const [game, setGame] = useState<Chess>(new Chess());
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [targetSquare, setTargetSquare] = useState<string>("");
  const [applyCustomStyles, setApplyCustomStyles] = useState(true);

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

  const makeAMove = useCallback(
    (
      move: { from: string; to: string; promotion?: string },
      send: boolean
    ): Move | null => {
      console.log("make move function");
      const gameCopy = new Chess(game.fen());
      let result: Move | null = null;
      try {
        result = gameCopy.move(move);
      } catch (err) {
        toast.error("invalid move");
      }

      if (result) {
        if (send) {
          socket?.send(
            JSON.stringify({
              type: "move",
              data: {
                nextTurn: game.turn() === "w" ? "B" : "W",
                gameId: joinMessage?.gameId,
                move,
              },
            })
          );
        }
        setGame(gameCopy);
        new MakeSound(gameCopy);
      }

      return result;
    },
    [game, socket, joinMessage?.gameId]
  );

  function onDrop(sourceSquare: string, targetSquare: string): boolean {
    if (side === "noMove") return true;
    if (game.turn() === "w" && side === "B") return false;
    if (game.turn() === "b" && side === "W") return false;

    const move = makeAMove(
      {
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      },
      true
    );

    if (move === null) return false;
    setValidMoves([]);
    return true;
  }

  function onSquareClick(square: string): void {
    if (validMoves.includes(square)) {
      onDrop(targetSquare, square);
    }
  }

  function onPieceClick(piece: string, square: Square) {
    if (side === "noMove") return;
    if (game.turn() === "w" && side === "B") return;
    if (game.turn() === "b" && side === "W") return;

    const moves = game.moves({ square, verbose: true });
    const uniqueMoves = moves.filter(
      (move, index, self) => index === self.findIndex((m) => m.to === move.to)
    );
    setValidMoves(uniqueMoves.map((move) => move.to));
    setTargetSquare(square);
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

  // for communcation after connetion
  useEffect(() => {
    if (!socket) return;
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data as string);

      switch (data.type) {
        case "move":
          toast.success("move");
          makeAMove(data.move, false);
          break;

        case "close":
          console.log(data);
          toast.error(`Connection closed: ${data.message}`);
          break;
        case "quit":
          console.log(data);
          toast.error(`Connection closed: ${data.message}`);
      }
    };
  }, [socket, makeAMove]);

  const handelGameTermination = useCallback(() => {
    if (side === "W")
      socket?.send(
        JSON.stringify({
          type: "gameOver",
          data: {
            gameId: joinMessage?.gameId,
          },
        })
      );
  }, [side, socket, joinMessage?.gameId]);

  // check for gameOver ccase
  useEffect(() => {
    if (game.isGameOver()) {
      toast.success("game over");
      handelGameTermination();
      const timer = setTimeout(() => setApplyCustomStyles(true), 300);
      return () => clearTimeout(timer);
    } else {
      setApplyCustomStyles(false);
    }
  }, [game, handelGameTermination]);

  // to set side
  useEffect(() => {
    console.log("game side effect");
    setSide(joinMessage?.side as "B" | "W");
  }, [joinMessage?.side]);

  return (
    <ChessContext.Provider
      value={{
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
      }}
    >
      {children}
    </ChessContext.Provider>
  );
}

export const useGameContext = () => {
  const context = useContext(ChessContext);
  if (context === undefined) {
    throw new Error("useGameContext must be used within a ChessContext");
  }
  return context;
};
