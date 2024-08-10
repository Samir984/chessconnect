"use client";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
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
}

const defaultSocketContext: SocketContext = {
  socket: null,
  setStartMode: () => {}, // Placeholder function, will be overwritten by provider
  startMode: undefined,
};

const SocketContext = createContext<SocketContext>(defaultSocketContext);

export default function SocketProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [startMode, setStartMode] = useState<GameModeType>();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const user = session?.user as User;
  const { email, name, image } = user || {};

  useEffect(() => {
    if (!startMode || !email) return; // Only connect if `start` is true and `email` is available

    const ws = new WebSocket(
      `ws://localhost:8080?userId=${email}&name=${name}&image=${image}&mode=${startMode}`
    );

    ws.onopen = () => {
      console.log("WebSocket connection opened");
      toast.success("Connected successfully");
      setSocket(ws);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      setStartMode(undefined);
      toast.error("Error connecting");
    };

    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        console.log("Received message:", data);
        toast.success("Message received");
      } catch (error) {
        console.error("Error parsing message data:", error);
        toast.error("Error processing message");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
      setStartMode(undefined);

      setSocket(null);
    };

    return () => {
      ws.close();
    };
  }, [startMode, email, name, image]);

  return (
    <SocketContext.Provider value={{ socket, setStartMode }}>
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
