import Image from "next/image";
import React from "react";

type OpponentLabelType = {
  name: string;
  image: string|null;
};

export default function OpponenetLabel({
  opponentLabel,
}: {
  opponentLabel: OpponentLabelType;
}) {
  const { name, image } = opponentLabel;

  return (
    <div className="flex w-[650px] px-2 py-3 gap-10   text-white">
      <Image
        src={image || "/blackP.png"} // Fallback image
        width={48}
        height={48}
        alt="user-image"
      />
      <span className="text-base">{name || "Opponent"}</span>
    </div>
  );
}
