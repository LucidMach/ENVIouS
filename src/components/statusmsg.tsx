import { useAtom } from "jotai";

import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";

import ROS_GeoMsg from "@/interfaces/geomsg";
import ROS_Status from "@/interfaces/status";
import { cva } from "class-variance-authority";

interface props {
  ROSmotor: ROS_GeoMsg;
  status: ROS_Status;
  position: "top" | "center";
}

const StatusMessage: React.FC<props> = ({ ROSmotor, status, position }) => {
  const [bg, ____] = useAtom(bgAtom);
  const [fg, ___] = useAtom(fgAtom);

  const msgSyles = cva(
    [
      `bg-${bg.hue}-${bg.value} border-2 border-${fg.hue}-${fg.value} rounded-xl p-2 flex flex-col justify-center items-center`,
    ],
    {
      variants: {
        position: {
          top: ["absolute", "top-4"],
          center: [],
        },
      },
      defaultVariants: {
        position: "center",
      },
    }
  );

  return (
    <>
      <div className={msgSyles({ position: position })}>
        <p className="font-bold">ROSBRIDGE {status}</p>
        {status === "CONNECTED" ? (
          <>
            <p className="font-light text-sm text-green-50">
              {JSON.stringify(ROSmotor)}
            </p>
          </>
        ) : status === "CLOSED" ? (
          <>
            <p className="font-light text-xs">
              make sure you're on same wifi connection as the robot
            </p>
          </>
        ) : null}
      </div>
    </>
  );
};

export default StatusMessage;
