import ROSLIB from "roslib";
import Head from "next/head";
import { useAtom } from "jotai";
import { ipAtom } from "@/atoms/ip";
import Slider from "@/components/slider";
import ROS_GeoMsg from "@/interfaces/geomsg";
import { useState, useRef, useEffect } from "react";
import Settings from "@/components/settings";
import Controls from "@/components/controls";
import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { ctAtom } from "@/atoms/ct";
import { stAtom } from "@/atoms/st";
import FPScounter from "@/components/fpsCounter";

const ROSbridge: React.FC = () => {
  const [ip, _____] = useAtom(ipAtom);
  const [bg, ____] = useAtom(bgAtom);
  const [fg, ___] = useAtom(fgAtom);
  const [ct, __] = useAtom(ctAtom);
  const [st, _] = useAtom(stAtom);

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

  // states for image streaming
  const [ROSimg, setROSimg] = useState<any>();

  // some refs
  const motorRef = useRef({ LMotor, RMotor });
  const cmd_vel_ref = useRef<ROSLIB.Topic<ROSLIB.Message>>();

  // rosbridge
  useEffect(() => {
    if (ip) {
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

      // Create a listener for /image_raw/compressed
      const img_rawc_ref = new ROSLIB.Topic({
        ros,
        name: "/image_raw/compressed",
        messageType: "sensor_msgs/msg/CompressedImage",
      });

      img_rawc_ref.subscribe((img: any) => {
        setROSimg(img);
      });
    }
  }, [ip]);

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
        z: LMotor - RMotor, // diff in max r and max l is 0.44 which is 2x max limit
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

  // keyboard inputs
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "w":
          setLMotor((curr) => curr + 0.01);
          setRMotor((curr) => curr + 0.01);
          break;
        case "x":
          setLMotor((curr) => curr - 0.01);
          setRMotor((curr) => curr - 0.01);
          break;
        case "a":
          setLMotor((curr) => curr + 0.01);
          break;
        case "d":
          setRMotor((curr) => curr + 0.01);
          break;
        case "s":
          setLMotor(0);
          setRMotor(0);
          break;
      }
    });
  }, []);

  const inputCon = () => {
    return ct === "sliders" ? (
      <div className="absolute w-full flex justify-between p-10">
        <Slider value={LMotor} setValue={setLMotor} />
        <Slider value={RMotor} setValue={setRMotor} />
      </div>
    ) : ct === "buttons" ? (
      <Controls
        className="bottom-20"
        Lvalue={LMotor}
        Rvalue={RMotor}
        setLValue={setLMotor}
        setRValue={setRMotor}
      />
    ) : null;
  };

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
        {inputCon()}
        <div
          className={`z-10 p-3 border-${fg.hue}-${fg.value} text-${fg.hue}-${fg.value} border-2 rounded-3xl h-5/6 w-5/6 flex flex-col items-center justify-center`}
        >
          {ROSimg && st === "camera" ? (
            <>
              <FPScounter ROSimg={ROSimg} />
              <img
                className="absolute -z-50 w-full h-full"
                src={"data:image/jpeg;base64," + ROSimg.data}
                alt="image from tb3"
              />
            </>
          ) : null}
          <div
            className={`bg-${bg.hue}-${bg.value} absolute bottom-4 border-2 border-${fg.hue}-${fg.value} rounded-xl p-2 flex flex-col justify-center items-center`}
          >
            <p className="font-bold">ROSBRIDGE {status}</p>
            {status === "CONNECTED" ? (
              <>
                <p className="font-light text-sm text-green-50">
                  {JSON.stringify(ROSmotor)}
                </p>
              </>
            ) : status === "CLOSED" ? (
              <>
                <p className="font-light text-xs">
                  make sure you're on same wifi connection as the robot
                </p>
              </>
            ) : null}
          </div>
        </div>
      </main>
      <Settings />
    </>
  );
};

export default ROSbridge;
