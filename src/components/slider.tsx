import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface props {
  className?: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}
const Slider: React.FC<props> = ({ className, value, setValue }) => {
  const [fg, setFG] = useAtom(fgAtom);
  const [val, setVal] = useState<number>(0);

  useEffect(() => setValue(val * 0.0022), [val]);

  return (
    <div className={"z-20 flex flex-col items-center gap-2" + className}>
      <input
        type="range"
        min="-100"
        max="100"
        value={val}
        onChange={(e) => setVal(parseInt(e.target.value))}
        onClick={() => setVal(0)}
        onTouchEnd={() => setVal(0)}
        step="5"
        className={`absolute landscape:w-1/3 md:w-1/2 h-2 -rotate-90 bg-${fg.hue}-${fg.value} rounded-lg appearance-none cursor-pointer`}
      />
    </div>
  );
};

export default Slider;
