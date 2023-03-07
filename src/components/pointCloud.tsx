import ROS_LidarMsg from "@/interfaces/lidarmsg";
import PointInCloud from "./pointInCloud";

interface props {
  ROSlidar: ROS_LidarMsg;
  scale: number;
}

const PointCloud: React.FC<props> = ({ ROSlidar, scale }) => {
  return (
    <>
      {ROSlidar.ranges.map((r, tdeg) => {
        if (r > ROSlidar.range_min && r < ROSlidar.range_max) {
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
      })}
    </>
  );
};

export default PointCloud;
