import { useSession } from "next-auth/react";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const SocketContext = createContext();

export default function SocketProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const email = session?.user?.email;
  useEffect(() => {
    // const ws = new WebSocket(`ws://localhost:8080?userId=${email}`);
    // console.log(ws);
    // ws.onerror = (error) => {
    //   console.error("WebSocket error:", error);
    //   toast.error("error in conneting");
    // };
    // ws.onclose = () => {
    //   console.log("WebSocket connection closed");
    // };
    // setSocket(ws);
  }, [socket, email]);
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
