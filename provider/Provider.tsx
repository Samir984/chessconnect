"use client";
import { SessionProvider } from "next-auth/react";
import React, { Children, ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import SocketProvider from "./SocketProvider";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <SocketProvider>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          containerClassName=""
          containerStyle={{}}
          toastOptions={{
            // Define default options
            className: "",
            duration: 5000,
            style: {
              background: "white",
              color: "#000",
            },

            success: {
              duration: 3000,
            },
          }}
        />
        {children}
      </SocketProvider>
    </SessionProvider>
  );
}
