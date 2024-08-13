import ChessBoard from "@/components/chess/ChessBoard";
import ChesstContextProvider from "@/components/chess/ChessContextProvider";
import OpponenetLabel from "@/components/OpponenetLabel";
import YourLabel from "@/components/YourLabel";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center gap-2 justify-center py-4">
      <h1 className="text-2xl laptop:text-4xl font-bold mb-3 laptop:mb-6">
        Offline Mode
      </h1>
      <div className="flex gap-4 flex-col items-center">
        <OpponenetLabel opponentLabel={{ name: "Opponent", image: null }} />
        <ChesstContextProvider>
          <ChessBoard />
        </ChesstContextProvider>
        <YourLabel />
      </div>
    </div>
  );
}
