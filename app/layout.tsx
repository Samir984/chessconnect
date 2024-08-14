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
      <body
        className={`${inter.className} flex   bg-black max-h-screen w-screen`}
      >
        <Provider>
          <div className="flex  flex-col sm-phone:flex-row   w-full   ">
            <header className="sm-phone:w-28 p-2 sm-phone:p-0  sm-phone:h-screen  phone:w-64 laptop:w-72 sm-phone:sticky sm-phone:top-0 sm-phone:left-0  block">
              <MainNav />
            </header>
            <main className="w-full ">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
