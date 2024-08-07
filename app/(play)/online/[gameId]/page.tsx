"use client";
import ChessBoard from "@/components/ChessBoard";
import OpponenetLabel from "@/components/OpponenetLabel";
import YourLabel from "@/components/YourLabel";
import { Socket } from "dgram";
import email from "next-auth/providers/email";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function PlayOnline() {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const email = session?.user?.email;
  useEffect(() => {
    // const ws = new WebSocket(`ws://localhost:8080?userId=${email}`);
    // console.log(ws);

    // ws.onerror = (error) => {
    //   console.error("WebSocket error:", error);
    //   toast.error("error in conneting");
    // };

    // ws.onclose = () => {
    //   console.log("WebSocket connection closed");
    // };

    // setSocket(ws);
  }, [socket, email]);

  return (
    <div className="flex gap-2  flex-col  justify-center h-screen ">
      <OpponenetLabel opponentLabel={{ name: "Opponent", image: null }} />
      <ChessBoard chessOptions={{ playerSide: null }} />
      <YourLabel />
    </div>
  );
}
