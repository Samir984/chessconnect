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
  setStartMode: React.Dispatch<React.SetStateAction<GameModeType>>;
  startMode: GameModeType;
  message: any;
}

const defaultSocketContext: SocketContext = {
  socket: null,
  setStartMode: () => {}, // Placeholder function, will be overwritten by provider
  startMode: undefined,
  message: {},
};

const SocketContext = createContext<SocketContext>(defaultSocketContext);

export default function SocketProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [startMode, setStartMode] = useState<GameModeType>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const user = session?.user as User;
  const [message, setMessage] = useState();
  const { email, name, image } = user || {};

  useEffect(() => {
    if (!startMode || !email) return;
    const ws = new WebSocket(
      `wss://chess-backend-ett2.onrender.com/?userId=${email}&name=${name}&image=${image}&mode=${startMode}`
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
      try {
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
      } catch (error) {
        console.error("Error parsing message data:", error);
        toast.error("Error processing message");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      toast.error("closed");
      setStartMode(undefined);
      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [startMode, email, name, image, router]);

  return (
    <SocketContext.Provider
      value={{ socket, message, setStartMode, startMode }}
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
