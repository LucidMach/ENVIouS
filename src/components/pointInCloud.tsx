import { fgHexAtom } from "@/atoms/fg";
import { useAtom } from "jotai";

interface props {
  x: number;
  y: number;
  z: number;
  raw_data: {
    range: number;
    angle: number;
  };
}

const PointInCloud: React.FC<props> = ({ x, y, z, raw_data }) => {
  const [fgHex, _] = useAtom(fgHexAtom);

  return (
    <>
      <mesh
        onClick={() => console.log(`${raw_data.range}@${raw_data.angle}`)}
        scale={0.04}
        position={[x, y, z]}
      >
        <sphereGeometry />
        <meshPhysicalMaterial color={fgHex} />
      </mesh>
    </>
  );
};

export default PointInCloud;
