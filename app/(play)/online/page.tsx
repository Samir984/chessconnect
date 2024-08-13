"use client";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { TbArrowsRandom } from "react-icons/tb";
import Image from "next/image";
import { useSession } from "next-auth/react";
import Loader from "@/components/Loader";
import ClipboardCopy from "@/components/ClipboardCopy";
import { User } from "next-auth";
import { useSocket } from "@/provider/SocketProvider";
import { useState } from "react";
import toast from "react-hot-toast";
import { socketCloseHandler } from "@/utils/helper";

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
  const { email, name, image } = session?.user || {};

  return (
    <div className="text-white py-8 relative min-h-screen flex flex-col items-center bg-black">
      <ConnectionNote />
      <div className="flex flex-col justify-center items-center mt-32 px-4">
        <h1 className="text-4xl text-slate-200 font-extrabold mb-10 text-center leading-tight">
          Connection with Player
        </h1>

        <ConnectionButtons userId={session?.user?.email} />

        <div className="flex flex-col items-center">
          {session?.user ? (
            <UserInfo user={session.user} find={true} />
          ) : (
            <div className="mt-8 p-4 bg-gray-800 text-white text-center rounded-lg shadow-lg">
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
  <div className="flex items-center gap-4 bg-gray-800 text-yellow-300 text-sm font-medium px-6 py-4 rounded-lg shadow-lg absolute top-4 left-1/2 transform -translate-x-1/2 w-[90%]">
    <RiErrorWarningLine size={24} />
    <p>
      <strong>Note:</strong> Playing with a random person may occasionally
      result in connection issues, as our site is still growing. For a smoother
      and more reliable experience, we recommend playing with a friend.
    </p>
  </div>
);

// ConnectionButtons Component
const ConnectionButtons = ({
  userId,
}: {
  userId: string | null | undefined;
}) => {
  const {
    socket,
    joiningLink,
    setConnectionMode,
    isConnetingToSocket,
    setIsConnetingToSocket,
    connetionMode,
  } = useSocket();

  const handelSocketConnetion = function (connectMode: "R" | "F") {
    if (!userId) {
      toast.error("Please login first");
      return;
    }

    if (socket?.OPEN === 1 || connetionMode === connectMode) {
      setConnectionMode(undefined);
      socketCloseHandler(socket, connetionMode, joiningLink, userId);
      return;
    }
    setIsConnetingToSocket(true);
    setConnectionMode(connectMode);
  };

  return (
    <div>
      <div className="flex gap-6 mb-12">
        <button
          className="bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-3 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={() => handelSocketConnetion("R")}
          disabled={isConnetingToSocket}
        >
          <TbArrowsRandom size={24} className="text-blue-300" />
          <span className="text-lg">Connect with Random</span>
        </button>
        <button
          className="bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 flex items-center gap-3 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
          onClick={() => handelSocketConnetion("F")}
          disabled={isConnetingToSocket}
        >
          <FaUserFriends size={24} className="text-green-300" />
          <span className="text-lg">Connect with Friend</span>
        </button>
      </div>
      {isConnetingToSocket && (
        <div className="flex flex-col mt-6 justify-center items-center mb-24 w-full h-full ">
          <p className="text-gray-400 mb-12">Connecting to websocket</p>
          <div className="socket-connecting-loader"> </div>
        </div>
      )}
    </div>
  );
};

// UserInfo Component
const UserInfo = ({ user }: UserInfoProps) => {
  const { connetionMode, socket, isConnetingToSocket, joiningLink } =
    useSocket();

  return (
    <div className="flex flex-col items-center gap-y-4 w-96">
      <div className="flex items-center justify-between w-full">
        <span className="text-base text-gray-400">You</span>
        <UserCard image={user?.image} name={user?.name} label="user" />
      </div>

      {connetionMode === "F" && joiningLink === null && !isConnetingToSocket ? (
        <Loader
          label="Generating Connection Link"
          loaderClassName="generating-link-loader"
        />
      ) : (
        connetionMode === "F" && (
          <div className="flex  flex-col items-center">
            <span className="text-gray-400 text-base">
              Share this link with your friend
            </span>
            <ClipboardCopy
              value={`${window.location.origin}/connection-request${joiningLink}`}
            />
          </div>
        )
      )}

      {socket?.OPEN && (
        <Loader
          label={`${
            connetionMode === "F"
              ? "Waiting for friend to connect"
              : connetionMode === "R"
              ? "Connecting to Player"
              : ""
          } `}
          loaderClassName="waiting-to-join "
        />
      )}
    </div>
  );
};

const UserCard = ({ image, name, label }: UserCardProps) => (
  <div className="flex items-center px-2 py-3 gap-4 text-white bg-gray-800 rounded-lg shadow-md">
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
