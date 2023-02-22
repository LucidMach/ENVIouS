import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction } from "react";

interface props {
  className?: string;
  Rvalue: number;
  Lvalue: number;
  setRValue: Dispatch<SetStateAction<number>>;
  setLValue: Dispatch<SetStateAction<number>>;
}

const Controls: React.FC<props> = ({
  className,
  Lvalue,
  Rvalue,
  setLValue,
  setRValue,
}) => {
  const [fg, _] = useAtom(fgAtom);
  const [bg, __] = useAtom(bgAtom);
  return (
    <div
      className={`absolute flex flex-col items-center z-20 gap-2 p-4 rounded-full ${className}`}
    >
      <div
        className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
        onClick={() =>
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "w" }))
        }
      >
        w
      </div>
      <div className="flex gap-60 items-center">
        <div
          className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
          onClick={() =>
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }))
          }
        >
          a
        </div>
        <div
          className={`bg-${fg.hue}-${fg.value} w-12 h-12 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
          onClick={() =>
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }))
          }
        >
          s
        </div>
        <div
          className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
          onClick={() =>
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "d" }))
          }
        >
          d
        </div>
      </div>
      <div
        className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
        onClick={() =>
          window.dispatchEvent(new KeyboardEvent("keydown", { key: "x" }))
        }
      >
        x
      </div>
    </div>
  );
};

export default Controls;
