import { GameModeType } from "@/provider/SocketProvider";

export function replaceUnderscores(name: string): string {
  return name.replace(/_/g, " ");
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
