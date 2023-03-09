import { secHexAtom, tertHexAtom } from "@/atoms/fg";
import ROS_LidarMsg from "@/interfaces/lidarmsg";
import { useAtom } from "jotai";
import PointInCloud from "./pointInCloud";

interface props {
  ROSlidar: ROS_LidarMsg;
  scale: number;
}

const PointCloud: React.FC<props> = ({ ROSlidar, scale }) => {
  const [tertHex, _] = useAtom(tertHexAtom);
  return (
    <>
      <mesh scale={0.15} position={[0, 0, 0]}>
        <sphereGeometry />
        <meshPhysicalMaterial color={tertHex} />
      </mesh>
      {ROSlidar.ranges.map((r, tdeg) => {
        // if range value is not garbage (i.e not to far and not too close)
        if (r > ROSlidar.range_min && r < ROSlidar.range_max) {
          if (r < 0.07 * scale) {
            const x = -scale * r * Math.sin(tdeg * 0.0174533);
            const y = scale * r * Math.cos(tdeg * 0.0174533);
            return (
              <PointInCloud
                key={tdeg}
                x={x}
                y={y}
                z={0}
                raw_data={{ range: ROSlidar.ranges[tdeg], angle: tdeg }}
              />
            );
          }
        }
      })}
    </>
  );
};

export default PointCloud;
