"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function YourLabel() {
  const { data: session } = useSession();

  return (
    <div className="flex w-[650px] px-2 py-3 gap-10   text-white">
      <Image
        src={session?.user?.image || "/whiteP.png"} // Fallback image
        width={48}
        height={48}
        alt="user-image"
      />
      <span className="text-base">{session?.user?.name || "Player"}</span>
    </div>
  );
}
