"use client";
import ChessBoard from "@/components/ChessBoard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { json } from "stream/consumers";
import UserLabel from "@/components/UserLabel";

export default function Home() {
  const [ws, setWs] = useState<null | WebSocket>(null);
  console.log("render");
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    setWs(socket);
    console.log(socket);

    socket.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    // socket.onmessage = (event) => {
    //   console.log("message receive", JSON.parse(event.data));
    // };

    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="flex gap-2  flex-col  justify-center h-screen ">
      <UserLabel />
      <ChessBoard socket={ws} />
      <UserLabel />
    </div>
  );
}
