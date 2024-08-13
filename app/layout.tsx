import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import Provider from "@/provider/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chess | Let's have fun",
  description: "chess game live-chess chess chess-nepal play chess in nepal ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className} flex   bg-black`}>
        <Provider>
          <header>
            <MainNav />
          </header>
          <main className="w-full h-screen ">{children}</main>
        </Provider>
      </body>
    </html>
  );
}
