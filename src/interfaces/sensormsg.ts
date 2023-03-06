interface ROS_SensMsg {
  header: {
    stamp: {
      sec: number;
      nanosec: number;
    };
    frame_id: string;
  };
  format: string;
  data: string;
}

export default ROS_SensMsg;
