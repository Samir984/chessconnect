"use client";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import ClipboardCopy from "@/components/ClipboardCopy";
import { User } from "next-auth";
import { GameModeType, useSocket } from "@/provider/SocketProvider";
import { Dispatch, SetStateAction, useState } from "react";

interface UserInfoProps {
  user: User;
  find: boolean;
}

interface UserCardProps {
  image?: string | null;
  name?: string | null;
  label: string;
}

export default function Page() {
  const { data: session } = useSession();
  const { socket, setStartMode } = useSocket();

  console.log(session?.user?.email);

  return (
    <div className="text-white py-8 relative min-h-screen flex flex-col items-center">
      <ConnectionNote />
      <div className="flex flex-col justify-center items-center mt-32 px-4">
        <h1 className="text-4xl text-slate-100 font-extrabold mb-10 text-center leading-tight">
          Connection with Player
        </h1>

        <ConnectionButtons setStartMode={setStartMode} />

        <div className="flex flex-col items-center">
          {session?.user ? (
            <UserInfo user={session.user} find={true} />
          ) : (
            <div className="mt-8 p-4 bg-gray-900 text-white text-center rounded-lg shadow-lg">
              <p className="text-xl font-semibold">Please Login first</p>
              <p className="mt-2 text-slate-500">
                You need to log in to play online
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ConnectionNote Component
const ConnectionNote = () => (
  <div className="flex items-center gap-4 bg-gray-900 text-yellow-400 text-sm font-medium px-6 py-4 rounded-lg shadow-lg absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%]">
    <RiErrorWarningLine size={24} />
    <p>
      <strong>Note:</strong> Playing with a random person may occasionally
      result in connection issues, as our site is still growing. For a smoother
      and more reliable experience, we recommend playing with a friend.
    </p>
  </div>
);

// ConnectionButtons Component
const ConnectionButtons = () => {
  const { setStartMode, startMode } = useSocket();

  return (
    <div className="flex gap-6 mb-12">
      <button
        className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-3"
        onClick={() => setStartMode("R")}
      >
        <TbArrowsRandom size={24} className="text-blue-200" />
        <span className="text-lg">Connect with Random</span>
      </button>
      <button
        className="bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-3"
        onClick={() => setStartMode("F")}
      >
        <FaUserFriends size={24} className="text-green-200" />
        <span className="text-lg">Connect with Friend</span>
      </button>
    </div>
  );
};

// UserInfo Component
const UserInfo = ({ user }: UserInfoProps) => {
  const [copied, setCopied] = useState(false);
  const { startMode } = useSocket();

  return (
    <div className="flex flex-col items-center gap-y-4 w-96">
      <div className="flex items-center justify-between w-full">
        <span className="text-base text-gray-400">You</span>
        <UserCard image={user?.image} name={user?.name} label="user" />
      </div>

      {startMode === "R" || (startMode === "F" && copied) ? (
        <Loader
          label="Generating Connection Link"
          loaderClassName="generating-link-loader"
        />
      ) : (
        <div className="flex items-center">
          <span className="text-gray-500 text-base">
            Share this link you your friend
          </span>
          <ClipboardCopy
            value="i hate you"
            copied={copied}
            setCopied={setCopied}
          />
        </div>
      )}

      {startMode && (
        <Loader
          label={`${
            startMode === "F"
              ? "Waiting for friend to connect"
              : startMode === "R"
              ? "Connecting to Player"
              : ""
          } `}
          loaderClassName="connecting-loader"
        />
      )}
    </div>
  );
};

const UserCard = ({ image, name, label }: UserCardProps) => (
  <div className="flex items-center px-2 py-3 gap-4 text-white bg-gray-700 rounded-lg shadow-md">
    <Image
      src={image || "/whiteP.png"}
      width={48}
      height={48}
      alt={`${label}-image`}
      className="rounded-full"
    />
    <span className="text-base">{name || "Player"}</span>
  </div>
);
