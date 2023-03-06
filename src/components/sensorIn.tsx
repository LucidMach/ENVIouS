import { useAtom } from "jotai";
import FPScounter from "./fpsCounter";
import { cva } from "class-variance-authority";

import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { stAtom } from "@/atoms/st";

import ROS_GeoMsg from "@/interfaces/geomsg";
import ROS_Status from "@/interfaces/status";
import ROS_SensMsg from "@/interfaces/sensormsg";
import StatusMessage from "./statusmsg";

interface props {
  ROSimg: ROS_SensMsg;
  status: ROS_Status;
  ROSmotor: ROS_GeoMsg;
}

const SensorIn: React.FC<props> = ({ ROSimg, ROSmotor, status }) => {
  const [bg, ____] = useAtom(bgAtom);
  const [fg, ___] = useAtom(fgAtom);
  const [st, _] = useAtom(stAtom);

  const boxStyles = cva(
    [
      "z-10",
      "p-3",
      `text-${fg.hue}-${fg.value}`,
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
    ],
    {
      variants: {
        intent: {
          border: [
            `border-${fg.hue}-${fg.value}`,
            "border-2",
            "rounded-3xl",
            "h-5/6",
            "w-5/6",
          ],
          borderless: [],
        },
      },
      defaultVariants: {
        intent: "borderless",
      },
    }
  );

  if (status === "CONNECTED" && st !== "none") {
    if (st === "camera")
      return (
        <div className={boxStyles({ intent: "borderless" })}>
          <FPScounter className="absolute bottom-4" ROSimg={ROSimg} />
          <img
            className="absolute -z-50 w-full h-full"
            src={"data:image/jpeg;base64," + ROSimg.data}
            alt="image from tb3"
          />
          <StatusMessage ROSmotor={ROSmotor} status={status} position="top" />
        </div>
      );
    if (st === "lidar") {
      return <>work in progress</>;
    }
  }
  return (
    <div className={boxStyles({ intent: "border" })}>
      <StatusMessage ROSmotor={ROSmotor} status={status} position="center" />
    </div>
  );
};

export default SensorIn;
