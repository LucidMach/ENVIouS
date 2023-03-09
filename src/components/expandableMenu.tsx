import { ctAtom } from "@/atoms/ct";
import { ipAtom } from "@/atoms/ip";
import { stAtom } from "@/atoms/st";

import axios from "axios";
import { useAtom } from "jotai";
import { useEffect } from "react";
import TWColorPicker from "./TWColorPicker";

import { bgAtom } from "@/atoms/bg";
import { fgAtom, fgHexAtom, secHexAtom, tertHexAtom } from "@/atoms/fg";

import { control, controlOptions } from "@/interfaces/control";
import { sensor, sensorOptions } from "@/interfaces/sensors";

const Menu: React.FC = () => {
  const [bg, setBG] = useAtom(bgAtom);
  const [fg, setFG] = useAtom(fgAtom);
  const [ip, setIP] = useAtom(ipAtom);
  const [st, setST] = useAtom(stAtom);
  const [ct, setCT] = useAtom(ctAtom);

  const [_, setFgHex] = useAtom(fgHexAtom);
  const [__, setSecHex] = useAtom(secHexAtom);
  const [___, setTertHex] = useAtom(tertHexAtom);

  const sensorType: sensor[] = [...sensorOptions];
  const controlType: control[] = [...controlOptions];

  useEffect(() => {
    axios
      .post("/api/tw2hex", {
        hue: fg.hue,
        value: fg.value,
      })
      .then((res) => {
        setFgHex(res.data.hex);
        setSecHex(res.data.secondaryHex);
        setTertHex(res.data.tertiaryHex);
      })
      .catch((err) => console.log(err));
  }, [fg]);

  return (
    <div className={`text-${bg.hue}-${bg.value} flex flex-col gap-2 mr-8 mb-4`}>
      <TWColorPicker title="background" bg={bg} setBG={setBG} />
      <TWColorPicker title="foreground" bg={fg} setBG={setFG} />
      <div className="flex gap-3">
        <p>localIP: </p>
        <input
          value={ip}
          className="text-center border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          type="text"
          onChange={(e) => setIP(e.currentTarget.value)}
        />
      </div>
      <div className="flex gap-3">
        <p>sensor: </p>
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
        <p>interface: </p>
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
