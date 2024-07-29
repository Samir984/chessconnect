import Image from "next/image";

export default function MainNav() {
  return (
    <div className="flex    border-r-2 border-gray-300 w-48 bg-black h-screen sticky top-0 left-0">
      <div className="flex  py-7 px-2 items-center justify-center  h-10 gap-2 font-semibold text-3xl w-full  text-white font-sans text-center bg-gray-600">
        <span>Chess</span>
        <Image src={"/chess.png"} width={40} height={40} alt="logo" />
      </div>
    </div>
  );
}
