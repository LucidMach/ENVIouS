const status = ["CONNECTED", "CLOSED", "ERROR"] as const;
type ROS_Status = typeof status[number];

export default ROS_Status;
