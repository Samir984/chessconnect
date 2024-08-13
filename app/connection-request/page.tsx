"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useSocket } from "@/provider/SocketProvider";

interface PlayerProps {
  image: string;
  name: string;
  label: string;
}

const PlayerCard = ({ image, name, label }: PlayerProps) => (
  <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-48">
    <div className="w-24 h-24 rounded-full border-4 border-gray-600 overflow-hidden  ">
      <Image src={image} width={100} height={100} alt={`${label}-image`} />
    </div>
    <h2 className="text-xl font-semibold text-white mt-3 whitespace-nowrap line-clamp-1">
      {name || "Player"}
    </h2>
    <p className="text-gray-300 text-base">{label}</p>
  </div>
);

export default function Page() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { setConnectionMode, setInviterId } = useSocket();
  const { email, name, image } = session?.user || {};

  const inviterId = searchParams.get("inviterId") as string;
  const inviterName = searchParams.get("inviterName") as string;
  const inviterImage = searchParams.get("inviterImage") as string;

  const handelJoining = function () {
    if (!email) {
      toast.error("Please login in first");
    }

    setConnectionMode("J");
  };

  console.log("\n\n\n invider id:", inviterId);

  useEffect(() => {
    setInviterId(inviterId);
  }, [setInviterId, inviterId]);
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
        onClick={handelJoining}
      >
        <span className="text-lg">Send Connection Request</span>
      </button>
    </div>
  );
}
