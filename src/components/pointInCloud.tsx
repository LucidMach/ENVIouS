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
  return (
    <>
      <mesh
        onClick={() => console.log(`${raw_data.range}@${raw_data.angle}`)}
        scale={0.1}
        position={[x, y, z]}
      >
        <sphereGeometry />
        <meshPhysicalMaterial color="cyan" />
      </mesh>
    </>
  );
};

export default PointInCloud;
