"use client";
import ChessBoard from "@/components/chess/ChessBoard";
import ChesstContextProvider from "@/components/chess/ChessContextProvider";
import OpponenetLabel from "@/components/OpponenetLabel";
import YourLabel from "@/components/YourLabel";
import { useSocket } from "@/provider/SocketProvider";
import { useRouter } from "next/navigation";

export default function PlayOnline() {
  const { joinMessage } = useSocket();
  const router = useRouter();

  if (joinMessage === null) {
    router.push("/online");
    return;
  }
  console.log(joinMessage?.opponent, joinMessage);

  return (
    <div className="flex gap-2 ml-8 flex-col  justify-center h-screen ">
      {joinMessage?.side === "W" ? (
        <>
          <OpponenetLabel opponentLabel={joinMessage.opponent} />
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
          <OpponenetLabel opponentLabel={joinMessage?.opponent} />
        </>
      )}
    </div>
  );
}
