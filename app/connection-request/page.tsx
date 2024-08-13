"use client";
import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

interface PlayerProps {
  image: string;
  name: string;
  label: string;
}

const PlayerCard = ({ image, name, label }: PlayerProps) => (
  <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
    <Image
      src={image}
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
  const { data: session } = useSession();
  const { email, name, image } = session?.user || {};

  const gameId = searchParams.get("gameId") as string;
  const inviterName = searchParams.get("inviterName") as string;
  const inviterImage = searchParams.get("inviterImage") as string;

  const handelJoining = function () {};

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-12">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-100">
        Match Request
      </h1>

      <div className="flex  gap-8 mb-12">
        <PlayerCard image={inviterImage} name={inviterName} label="Inviter" />
        <PlayerCard
          image={image || "/blackP.png"}
          name={name || "Player"}
          label="Invitee"
        />
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
