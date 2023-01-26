import { Dispatch, SetStateAction } from "react";

interface props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}
const Slider: React.FC<props> = ({ value, setValue }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <input
        type="range"
        min="-100"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        step="5"
        className="absolute landscape:w-1/3 md:w-1/2 h-2 -rotate-90 bg-yellow-500 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};

export default Slider;
