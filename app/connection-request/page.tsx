"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

interface PlayerProps {
  image?: string | null;
  name?: string | null;
  label: string;
}

const PlayerCard = ({ image, name, label }: PlayerProps) => (
  <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-xs">
    <Image
      src={image || "/blackP.png"}
      width={100}
      height={100}
      alt={`${label}-image`}
      className="rounded-full border-4 border-gray-600"
    />
    <h2 className="text-xl font-semibold text-white mt-4">
      {name || "Player"}
    </h2>
    <p className="text-gray-400 text-sm">{label}</p>
  </div>
);

export default function Page() {
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId");
  const inviterName = searchParams.get("inviterName");
  const inviterImage = searchParams.get("inviterImage");
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-100">
        Connect with a Player
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        <PlayerCard image={inviterImage} name={inviterName} label="Inviter" />
        <PlayerCard image={player2.image} name={player2.name} label="Invitee" />
      </div>

      <button
        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-3"
        onClick={() => alert("Connection Request Sent")}
      >
        <span className="text-lg">Send Connection Request</span>
      </button>
    </div>
  );
}
