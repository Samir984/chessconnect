import ChessBoard from "@/components/ChessBoard";
import OpponenetLabel from "@/components/OpponenetLabel";
import YourLabel from "@/components/YourLabel";

export default function Home() {
  return (
    <div className="flex gap-2  flex-col  justify-center h-screen ">
      <OpponenetLabel opponentLabel={{ name: "Opponent", image: null }} />
      <ChessBoard chessOptions={{ playerSide: null }} />
      <YourLabel />
    </div>
  );
}
