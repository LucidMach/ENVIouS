import { bgAtom } from "@/atoms/bg";
import { ctAtom } from "@/atoms/ct";
import { fgAtom } from "@/atoms/fg";
import ROS_GeoMsg from "@/interfaces/geomsg";
import { useAtom } from "jotai";
import {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Controls from "./controls";
import Slider from "./slider";

interface props {
  cmd_vel_ref: MutableRefObject<ROSLIB.Topic<ROSLIB.Message> | undefined>;
  setROSmotor: (value: SetStateAction<ROS_GeoMsg>) => void;
}

const ControlOut: React.FC<props> = ({ cmd_vel_ref, setROSmotor }) => {
  const [ct, __] = useAtom(ctAtom);
  const [bg, ____] = useAtom(bgAtom);
  const [fg, ___] = useAtom(fgAtom);

  const [RMotor, setRMotor] = useState<number>(0);
  const [LMotor, setLMotor] = useState<number>(0);

  const motorRef = useRef({ LMotor, RMotor });

  useEffect(() => {
    motorRef.current = {
      LMotor,
      RMotor,
    };
    const motorData: ROS_GeoMsg = {
      angular: {
        x: 0,
        y: 0,
        z: LMotor - RMotor, // diff in max r and max l is 0.44 which is 2x max limit
      },
      linear: {
        x: (LMotor + RMotor) / 2,
        y: 0,
        z: 0,
      },
    };
    setROSmotor(motorData);
    cmd_vel_ref.current?.publish(motorData);
  }, [RMotor, LMotor]);

  // keyboard inputs
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w" || "ArrowUp":
          setLMotor((curr) => curr + 0.01);
          setRMotor((curr) => curr + 0.01);
          break;
        case "x" || "ArrowDown":
          setLMotor((curr) => curr - 0.01);
          setRMotor((curr) => curr - 0.01);
          break;
        case "a" || "ArrowLeft":
          setLMotor((curr) => curr + 0.01);
          break;
        case "d" || "ArrowDown":
          setRMotor((curr) => curr + 0.01);
          break;
        case "s" || " ":
          setLMotor(0);
          setRMotor(0);
          break;
      }
    });
  }, []);

  if (ct === "sliders") {
    return (
      <div className="absolute w-full flex justify-between p-10">
        <Slider value={LMotor} setValue={setLMotor} />
        <Slider value={RMotor} setValue={setRMotor} />
      </div>
    );
  }
  if (ct === "buttons") {
    return (
      <Controls
        Lvalue={LMotor}
        Rvalue={RMotor}
        setLValue={setLMotor}
        setRValue={setRMotor}
      />
    );
  }
  if (ct === "keyboard") {
    return (
      <div className={`absolute text-${fg.hue}-${fg.value}`}>
        you can use{" "}
        <span
          className={`rounded-full p-1 bg-${fg.hue}-${fg.value} text-${bg.hue}-${bg.value}`}
        >
          WASDX
        </span>{" "}
        or{" "}
        <span
          className={`rounded-full p-1 bg-${fg.hue}-${fg.value} text-${bg.hue}-${bg.value}`}
        >
          Spacebar + Arrow Keys
        </span>{" "}
        to control the robot
      </div>
    );
  }

  return <>maybe a new control type is in development</>;
};

export default ControlOut;
