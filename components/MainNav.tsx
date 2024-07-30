import Image from "next/image";
import Link from "next/link";

export default function MainNav() {
  return (
    <div className="flex  border-r-2 border-gray-300 w-48 bg-black min-h-screen sticky top-0 left-0">
      <Logo />
      

    </div>
  );
}

export function Logo() {
  return (
    <Link href="/" className="w-full">
      <div className="flex  py-7 px-2 items-center justify-center  h-10 gap-2 font-semibold text-3xl w-full  text-white font-sans text-center bg-gray-600">
        <span>Chess</span>
        <Image src={"/chess.png"} width={40} height={40} alt="logo" />
      </div>
    </Link>
  );
}
