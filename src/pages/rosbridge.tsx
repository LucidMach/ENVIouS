import ROSLIB from "roslib";
import Head from "next/head";
import { useAtom } from "jotai";
import { ipAtom } from "@/atoms/ip";
import Slider from "@/components/slider";
import ROS_GeoMsg from "@/interfaces/geomsg";
import { useState, useRef, useEffect } from "react";
import Settings from "@/components/settings";
import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";

const ROSbridge: React.FC = () => {
  // states to track motor
  const [RMotor, setRMotor] = useState<number>(0);
  const [LMotor, setLMotor] = useState<number>(0);

  const [status, setStatus] = useState<"CONNECTED" | "CLOSED" | "ERROR">(
    "CLOSED"
  );
  const [ROSmotor, setROSmotor] = useState<ROS_GeoMsg>({
    angular: { x: 0, y: 0, z: 0 },
    linear: { x: 0, y: 0, z: 0 },
  });

  const motorRef = useRef({ LMotor, RMotor });
  const cmd_vel_ref = useRef<ROSLIB.Topic<ROSLIB.Message>>();

  // rosbridge
  useEffect(() => {
    const ros = new ROSLIB.Ros({ url: `ws://${ip}:9090` });

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

    cmd_vel_ref.current.subscribe((message: any) => {
      setROSmotor(message);
    });
  }, []);

  // motor value ref update on state change
  useEffect(() => {
    motorRef.current = {
      LMotor,
      RMotor,
    };
    const motorData: ROS_GeoMsg = {
      angular: {
        x: 0,
        y: 0,
        z: (RMotor - LMotor) / 2, // diff in max r and max l is 0.44 which is 2x max limit
      },
      linear: {
        x: (LMotor + RMotor) / 2,
        y: 0,
        z: 0,
      },
    };
    setROSmotor(motorData);
    cmd_vel_ref.current?.publish(motorData);
  }, [RMotor, LMotor]);

  const [ip, setIp] = useAtom(ipAtom);
  const [bg, setBG] = useAtom(bgAtom);
  const [fg, setFG] = useAtom(fgAtom);

  return (
    <>
      <Head>
        <title>Video Stream</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`bg-${bg.hue}-${bg.value} w-full h-full flex justify-evenly items-center`}
      >
        <Slider value={LMotor} setValue={setLMotor} />
        <div
          className={`p-3 border-${fg.hue}-${fg.value} text-${fg.hue}-${fg.value} border-2 rounded-3xl h-5/6 w-5/6 flex flex-col items-center justify-center`}
          onClick={() => {
            setLMotor(0);
            setRMotor(0);
          }}
        >
          <p className="font-bold">{status}</p>
          {status === "CONNECTED" ? (
            <>
              <p className="font-light text-sm text-green-50">
                {JSON.stringify(ROSmotor)}
              </p>
              <p className="font-light text-xs">click to reset motors</p>
            </>
          ) : null}
        </div>
        <Slider value={RMotor} setValue={setRMotor} />
      </main>
      <Settings />
    </>
  );
};

export default ROSbridge;
