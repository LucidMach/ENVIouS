import ROSLIB from "roslib";
import Head from "next/head";
import { useAtom } from "jotai";

import { useState, useRef, useEffect } from "react";

import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { ipAtom } from "@/atoms/ip";

import SensorIn from "@/components/sensorIn";
import Settings from "@/components/settings";
import ControlOut from "@/components/controlOut";

import ROS_GeoMsg from "@/interfaces/geomsg";
import ROS_CamMsg from "@/interfaces/cammsg";
import ROS_Status from "@/interfaces/status";
import ROS_LidarMsg from "@/interfaces/lidarmsg";

import tributeImage from "@/interfaces/sample_image.json";
import tributeLidar from "@/interfaces/sample_lidar.json";

const ROSbridge: React.FC = () => {
  const [ip, _____] = useAtom(ipAtom);
  const [bg, ____] = useAtom(bgAtom);
  const [fg, ___] = useAtom(fgAtom);

  const [status, setStatus] = useState<ROS_Status>("CLOSED");

  const [ROSimg, setROSimg] = useState<ROS_CamMsg>(tributeImage);
  const [ROSlidar, setROSlidar] = useState<ROS_LidarMsg>(tributeLidar);
  const [ROSmotor, setROSmotor] = useState<ROS_GeoMsg>({
    angular: { x: 0, y: 0, z: 0 },
    linear: { x: 0, y: 0, z: 0 },
  });

  const cmd_vel_ref = useRef<ROSLIB.Topic<ROSLIB.Message>>();
  const img_rawc_ref = useRef<ROSLIB.Topic<ROSLIB.Message>>();
  const lidar_scan_ref = useRef<ROSLIB.Topic<ROSLIB.Message>>();

  // rosbridge
  useEffect(() => {
    if (ip.localIP || ip.ngrokURL) {
      const url =
        ip.type === "localip"
          ? `ws://${ip.localIP}:9090`
          : `wss://${ip.ngrokURL}`;

      const ros = new ROSLIB.Ros({ url });

      // When the Rosbridge server connects, fill the span with id "status" with "successful"
      ros.on("connection", () => {
        setStatus("CONNECTED");
      });

      // When the Rosbridge server experiences an error, fill the "status" span with the returned error
      ros.on("error", (error) => {
        setStatus("ERROR");
        console.log(error);
      });

      // When the Rosbridge server shuts down, fill the "status" span with "closed"
      ros.on("close", () => {
        setStatus("CLOSED");
      });

      // Create a listener for /cmd_vel
      cmd_vel_ref.current = new ROSLIB.Topic({
        ros,
        name: "/cmd_vel",
        messageType: "geometry_msgs/msg/Twist",
      });

      // Create a listener for /cmd_vel
      lidar_scan_ref.current = new ROSLIB.Topic({
        ros,
        name: "/scan",
        messageType: "sensor_msgs/LaserScan",
      });

      lidar_scan_ref.current.subscribe((msg: any) => {
        const data = msg as ROS_LidarMsg;
        setROSlidar(data);
      });

      // Create a listener for /image_raw/compressed
      img_rawc_ref.current = new ROSLIB.Topic({
        ros,
        name: "/image_raw/compressed",
        messageType: "sensor_msgs/msg/CompressedImage",
      });

      img_rawc_ref.current.subscribe((msg: any) => {
        const img = msg as ROS_CamMsg;
        setROSimg(img);
      });
    }
  }, [ip]);

  return (
    <>
      <Head>
        <title>envious | ui</title>
        <meta
          name="description"
          content="environment visualisation software for ros robots"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`bg-${bg.hue}-${bg.value} w-full h-full flex justify-evenly items-center touch-none`}
      >
        <Settings />
        <ControlOut cmd_vel_ref={cmd_vel_ref} setROSmotor={setROSmotor} />
        <SensorIn
          ROSimg={ROSimg}
          ROSlidar={ROSlidar}
          status={status}
          ROSmotor={ROSmotor}
        />
      </main>
    </>
  );
};

export default ROSbridge;
