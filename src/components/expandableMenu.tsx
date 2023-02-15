import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import TWColorPicker from "./TWColorPicker";

const Menu: React.FC = () => {
  const [bg, setBG] = useAtom(bgAtom);
  const [fg, setFG] = useAtom(fgAtom);

  return (
    <div className={`text-${bg.hue}-${bg.value} flex flex-col gap-2`}>
      <TWColorPicker title="BG" bg={bg} setBG={setBG} />
      <TWColorPicker title="FG" bg={fg} setBG={setFG} />
    </div>
  );
};

export default Menu;
