import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import { Dispatch, SetStateAction } from "react";

interface props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}
const Slider: React.FC<props> = ({ value, setValue }) => {
  const [fg, setFG] = useAtom(fgAtom);

  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="range"
        min="-0.22"
        max="0.22"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        step="0.01"
        className={`absolute landscape:w-1/3 md:w-1/2 h-2 -rotate-90 bg-${fg.hue}-${fg.value} rounded-lg appearance-none cursor-pointer`}
      />
    </div>
  );
};

export default Slider;
