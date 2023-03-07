interface props {
  x: number;
  y: number;
  z: number;
}

const PointInCloud: React.FC<props> = ({ x, y, z }) => {
  return (
    <>
      <mesh scale={0.1} position={[x, y, z]}>
        <sphereGeometry />
        <meshPhysicalMaterial color="cyan" />
      </mesh>
    </>
  );
};

export default PointInCloud;
