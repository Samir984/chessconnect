import SocketProvider from "@/provider/SocketProvider";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="">
      <SocketProvider>{children}</SocketProvider>
    </div>
  );
}
