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
    <div className="bg-black text-white min-h-screen flex flex-col items-center gap-2 justify-center py-4">
      <h1 className="text-2xl  tablet:text-3xl laptop:text-4xl font-bold mb-3 laptop:mb-6">
        Online Mode
      </h1>
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
