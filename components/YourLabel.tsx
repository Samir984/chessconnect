"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import GameQuitButton from "./buttons/GameQuitButton";

export default function YourLabel() {
  const { data: session } = useSession();
  const isUser = true;

  return (
    <div className="flex justify-between w-[665px] px-2 py-3 gap-10 text-white bg-gray-800 rounded-lg shadow-lg">
      <div className="flex gap-10 items-center">
        <Image
          src={session?.user?.image || "/whiteP.png"} // Fallback image
          width={48}
          height={48}
          alt="user-image"
          className="rounded-full border-2 border-gray-700"
        />
        <span className="text-base">{session?.user?.name || "Player"}</span>
      </div>
      {isUser ? <GameQuitButton /> : ""}
    </div>
  );
}
