import { useSocket } from "@/provider/SocketProvider";
import Image from "next/image";
import React from "react";
import GameQuitButton from "./buttons/GameQuitButton";

type OpponentLabelType = {
  name: string;
  image: string | null;
};

export default function OpponentLabel({
  opponentLabel,
}: {
  opponentLabel: OpponentLabelType;
}) {
  const { name, image } = opponentLabel;
  const isUser = false;

  return (
    <div className="flex justify-between w-[350px] phone:w-[450px] tablet:w-[550px] laptop:w-[660px] p-2 phone:py-3  bg-black text-white border border-gray-700 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <Image
          src={image || "/blackP.png"} // Fallback image
          width={42}
          height={42}
          alt="user-image"
          className="rounded-full border border-gray-600"
        />
        <span className="text-lg font-semibold">{name || "Opponent"}</span>
      </div>
      {isUser ? <GameQuitButton /> : ""}
    </div>
  );
}
