import Image from "next/image";
import Link from "next/link";

const NAV: React.FC = () => {
  return (
    <>
      <div className="w-full mt-4 flex flex-row items-center justify-center">
        <div className="border-yellow-300 bg-slate-900 z-10 border-2 p-1 rounded-full">
          <Link href="/">
            <Image
              src="/icon.png"
              loading="eager"
              alt="logo"
              width={75}
              height={75}
            />
          </Link>
        </div>
        <div className="bg-yellow-300 text-black w-[90%] relative right-5 rounded-r-full py-2 px-6 flex flex-col items-end">
          <h1 className="text-base font-black">envious</h1>
          <h2 className="text-xs font-thin">user interface</h2>
        </div>
      </div>
    </>
  );
};

export default NAV;
