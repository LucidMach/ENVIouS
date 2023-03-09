export const sensorOptions = [
  "camera",
  "lidar",
  "lidar + camera",
  "none",
] as const;
export type sensor = typeof sensorOptions[number];
