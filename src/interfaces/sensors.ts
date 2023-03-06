export const sensorOptions = ["camera", "lidar", "none"] as const;
export type sensor = typeof sensorOptions[number];
