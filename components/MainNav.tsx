import Image from "next/image";
import { MdOutlineOnlinePrediction } from "react-icons/md";
import { IoCloudOfflineOutline } from "react-icons/io5";
import GoogleSigninButton  from "./GooleSigninButton";


import Link from "next/link";

export default function MainNav() {
  return (
    <div className="flex flex-col   border-r-2 border-gray-300 w-52  min-h-screen sticky top-0 left-0">
      <Logo />

      <nav className="flex-1 mt-8  text-white ">
        <ul className="space-y-4">
          <li className="">
            <Link
              href="#"
              className="flex gap-4 items-center py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors "
            >
              <MdOutlineOnlinePrediction size={24} />
              <span>Play Online</span>
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="flex gap-4 items-center py-2 px-4 rounded-lg hover:bg-gray-500 transition-colors"
            >
              <IoCloudOfflineOutline size={24} />
              <span>Play Offline</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="mt-auto mb-1 text-white ">
        <GoogleSigninButton />
      </div>
    </div>
  );
}

export function Logo() {
  return (
    <Link href="/" className="w-full">
      <div className="flex  py-7 px-2 items-center justify-center  h-10 gap-2 font-semibold text-3xl w-full   font-sans text-center bg-white">
        <span>Chess</span>
        <Image src={"/chess.png"} width={40} height={40} alt="logo" />
      </div>
    </Link>
  );
}
