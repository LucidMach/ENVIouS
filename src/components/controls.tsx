import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction } from "react";

interface props {
  Rvalue: number;
  Lvalue: number;
  setRValue: Dispatch<SetStateAction<number>>;
  setLValue: Dispatch<SetStateAction<number>>;
}

const Controls: React.FC<props> = ({
  Lvalue,
  Rvalue,
  setLValue,
  setRValue,
}) => {
  const [fg, _] = useAtom(fgAtom);
  const [bg, __] = useAtom(bgAtom);
  return (
    <div
      className={`absolute bottom-1 right-10 flex flex-col items-center gap-2 p-4 rounded-full`}
    >
      <div
        className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
        onClick={() => {
          setLValue(Lvalue + 0.01);
          setRValue(Rvalue + 0.01);
        }}
      >
        w
      </div>
      <div className="flex gap-12">
        <div
          className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
          onClick={() => setLValue(Lvalue + 0.1)}
        >
          a
        </div>
        <div
          className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
          onClick={() => setRValue(Rvalue + 0.1)}
        >
          d
        </div>
      </div>
      <div
        className={`bg-${fg.hue}-${fg.value} w-12 h-16 rounded-full text-${bg.hue}-${bg.value} flex justify-center items-center cursor-pointer`}
        onClick={() => {
          setLValue(Lvalue - 0.01);
          setRValue(Rvalue - 0.01);
        }}
      >
        x
      </div>
    </div>
  );
};

export default Controls;
