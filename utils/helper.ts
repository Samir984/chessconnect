import { GameModeType } from "@/provider/SocketProvider";

export const BOARD_WIDTH = 660;
export const SQUARE_SIZE = BOARD_WIDTH / 8;

export function getSquarePosition(square: string): {
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

export function getQueryParam(queryParam: string, param: string) {
  const fullUrl = new URL(queryParam, "http://localhost");
  const urlParams = new URLSearchParams(fullUrl.search);

  return urlParams.get(param);
}

export function socketCloseHandler(
  socket: WebSocket | null,
  connetionMode: GameModeType,
  userId: string | null | undefined
) {
  console.log("handel socket closed", socket, connetionMode, userId);
  if (!socket || !userId || !connetionMode) return;

  if (connetionMode === "F") {
    socket.send(
      JSON.stringify({
        type: "closeSocketBeforeJoin",
        data: {
          mode: connetionMode,
          inviterId: userId,
        },
      })
    );
  } else if (connetionMode === "R") {
    socket.send(
      JSON.stringify({
        type: "closeSocketBeforeJoin",
        data: {
          mode: connetionMode,
          userId,
        },
      })
    );
  }
  socket.close(1000, "connetion closed from client side.");
}
