"use client";

import ChessBoard from "@/components/ChessBoard";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="text-center text-3xl font-bold">Chess</h1>
      <ChessBoard />
    </div>
  );
}
