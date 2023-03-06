import { bgAtom } from "@/atoms/bg";
import { ctAtom } from "@/atoms/ct";
import { fgAtom } from "@/atoms/fg";
import { ipAtom } from "@/atoms/ip";
import { stAtom } from "@/atoms/st";
import { control, controlOptions } from "@/interfaces/control";
import { sensor, sensorOptions } from "@/interfaces/sensors";
import { useAtom } from "jotai";
import TWColorPicker from "./TWColorPicker";

const Menu: React.FC = () => {
  const [bg, setBG] = useAtom(bgAtom);
  const [fg, setFG] = useAtom(fgAtom);
  const [ip, setIP] = useAtom(ipAtom);
  const [st, setST] = useAtom(stAtom);
  const [ct, setCT] = useAtom(ctAtom);

  const sensorType: sensor[] = [...sensorOptions];
  const controlType: control[] = [...controlOptions];

  return (
    <div className={`text-${bg.hue}-${bg.value} flex flex-col gap-2 mr-8 mb-4`}>
      <TWColorPicker title="BG" bg={bg} setBG={setBG} />
      <TWColorPicker title="FG" bg={fg} setBG={setFG} />
      <div className="flex gap-3">
        <p>IP: </p>
        <input
          value={ip}
          className="text-center border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          onChange={(e) => setIP(e.currentTarget.value)}
        />
      </div>
      <div className="flex gap-3">
        <p>ST: </p>
        <select
          value={st}
          onChange={(e) => setST(e.currentTarget.value as typeof st)}
          id="sensor-type"
          className="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {sensorType.map((color) => {
            return <option value={color}>{color}</option>;
          })}
        </select>
      </div>
      <div className="flex gap-3">
        <p>CT: </p>
        <select
          value={ct}
          onChange={(e) => setCT(e.currentTarget.value as typeof ct)}
          id="sensor-type"
          className="border text-center text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          {controlType.map((color) => {
            return <option value={color}>{color}</option>;
          })}
        </select>
      </div>
    </div>
  );
};

export default Menu;
