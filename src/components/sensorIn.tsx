import { useAtom } from "jotai";
import FPScounter from "./fpsCounter";
import { Canvas } from "@react-three/fiber";
import { cva } from "class-variance-authority";

import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { stAtom } from "@/atoms/st";

import ROS_GeoMsg from "@/interfaces/geomsg";
import ROS_Status from "@/interfaces/status";
import ROS_CamMsg from "@/interfaces/cammsg";
import StatusMessage from "./statusmsg";
import ROS_LidarMsg from "@/interfaces/lidarmsg";

import { Stats, OrbitControls } from "@react-three/drei";
import PointCloud from "./pointCloud";

interface props {
  ROSimg: ROS_CamMsg;
  status: ROS_Status;
  ROSmotor: ROS_GeoMsg;
  ROSlidar: ROS_LidarMsg;
}

const SensorIn: React.FC<props> = ({ ROSimg, ROSmotor, status, ROSlidar }) => {
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
            className="absolute -z-50"
            src={"data:image/jpeg;base64," + ROSimg.data}
            alt="image from tb3"
          />
          <StatusMessage ROSmotor={ROSmotor} status={status} position="top" />
        </div>
      );
    if (st === "lidar") {
      return (
        <>
          <Canvas>
            <pointLight position={[10, 10, 10]} />
            <PointCloud scale={10} ROSlidar={ROSlidar} />
            <mesh scale={0.15} position={[0, 0, 0]}>
              <sphereGeometry />
              <meshPhysicalMaterial color="hotpink" />
            </mesh>
            <OrbitControls />
            <Stats />
          </Canvas>
        </>
      );
    }
    if (st === "lidar + camera") {
      return (
        <div className="flex flex-col w-full h-full items-center">
          <Canvas className="z-10">
            <pointLight position={[10, 10, 10]} />
            <PointCloud scale={10} ROSlidar={ROSlidar} />
          </Canvas>
          <img
            className={`absolute bottom-4 h-1/6 w-1/4 border-2 border-${fg.hue}-${fg.value} rounded-full`}
            src={"data:image/jpeg;base64," + ROSimg.data}
            alt="image from tb3"
          />
        </div>
      );
    }
  }
  return (
    <div className={boxStyles({ intent: "border" })}>
      <StatusMessage ROSmotor={ROSmotor} status={status} position="center" />
    </div>
  );
};

export default SensorIn;
