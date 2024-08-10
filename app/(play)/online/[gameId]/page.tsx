"use client";
import ChessBoard from "@/components/chess/ChessBoard";
import ChesstContextProvider from "@/components/chess/ChessContextProvider";
import OpponenetLabel from "@/components/OpponenetLabel";
import YourLabel from "@/components/YourLabel";
import { useSocket } from "@/provider/SocketProvider";

export default function PlayOnline() {
  const { message } = useSocket();
  console.log(message.opponent, message);

  return (
    <div className="flex gap-2  flex-col  justify-center h-screen ">
      {message.side === "W" ? (
        <>
          <OpponenetLabel opponentLabel={message.opponent} />
          <ChesstContextProvider>
            <ChessBoard />
          </ChesstContextProvider>
          <YourLabel />
        </>
      ) : (
        <>
          <YourLabel />
          <ChesstContextProvider>
            <ChessBoard />
          </ChesstContextProvider>
          <OpponenetLabel opponentLabel={message.opponent} />
        </>
      )}
    </div>
  );
}
