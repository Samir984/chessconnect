import ChessBoard from "@/components/chess/ChessBoard";
import ChessContext from "@/components/chess/ChessProvider";
import OpponenetLabel from "@/components/OpponenetLabel";
import YourLabel from "@/components/YourLabel";

export default function Home() {
  return (
    <div className="flex gap-2  flex-col  justify-center h-screen ">
      <OpponenetLabel opponentLabel={{ name: "Opponent", image: null }} />
      <ChessContext>
        <ChessBoard chessOptions={{ playerSide: "noMove" }} />
      </ChessContext>
      <YourLabel />
    </div>
  );
}
