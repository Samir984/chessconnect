"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

export type GameModeType = "R" | "F" | undefined;
interface SocketContext {
  socket: WebSocket | null;
  setConnectionMode: React.Dispatch<React.SetStateAction<GameModeType>>;
  connetionMode: GameModeType;
  message: any;
}

const defaultSocketContext: SocketContext = {
  socket: null,
  setConnectionMode: () => {}, // Placeholder function, will be overwritten by provider
  connetionMode: undefined,
  message: {},
};

const SocketContext = createContext<SocketContext>(defaultSocketContext);

export default function SocketProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [connetionMode, setConnectionMode] = useState<GameModeType>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const user = session?.user as User;
  const [message, setMessage] = useState();
  // const [move, setMove] = useState();
  const { email, name, image } = user || {};
  console.log(connetionMode, socket?.OPEN);

  useEffect(() => {
    if (!connetionMode || !email) return;

    // const ws = new WebSocket(
    //   `wss://chess-backend-ett2.onrender.com/?userId=${email}&name=${name}&image=${image}&mode=${connetionMode}`
    // );

    const ws = new WebSocket(
      `ws://localhost:8080?userId=${email}&name=${name}&image=${image}&mode=${connetionMode}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      toast.success("Connected successfully");
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      toast.error("Error connecting");
    };

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data as string);
      console.log("Received message:", data);
      toast.success("Message received");
      switch (data.type) {
        case "joined":
          toast.success("join successfully");
          setMessage(data);
          router.push(`online/${data.gameId}`);
          break;
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      router.push(`online/`);
      toast.error("closed");
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [connetionMode, email, name, image, router]);

  return (
    <SocketContext.Provider
      value={{ socket, message, setConnectionMode, connetionMode }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
