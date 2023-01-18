import Head from "next/head";
import { Inter } from "@next/font/google";
import { useEffect, useState } from "react";
import Slider from "@/components/slider";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [imgB64, setImgB64] = useState<string>("");

  const [prevTime, setPrev] = useState(Date.now());
  const [count, setCount] = useState(0);
  const [fps, setFPS] = useState(0);

  const [RMotor, setRMotor] = useState<number>(0);
  const [LMotor, setLMotor] = useState<number>(0);

  const ws_endpoint = "ws://192.168.128.90:5000/";

  // get cam feeds
  useEffect(() => {
    const ws_cam = new WebSocket(ws_endpoint);

    ws_cam.onopen = () => {
      console.log("handshake successful [listener]");
      ws_cam.send("READY");

      ws_cam.onmessage = (img) => {
        setImgB64(img.data);
        ws_cam.send("READY");
      };
    };

    ws_cam.onclose = () => {
      console.log("disconnected [listener]");
    };
  }, []);

  // FPS tracker
  useEffect(() => {
    setCount(count + 1);
    if (Date.now() - prevTime > 1000) {
      setFPS(count);
      setPrev(Date.now());
      setCount(0);
    }
  }, [imgB64]);

  // send motor values
  useEffect(() => {
    console.log({ LMotor, RMotor });
  }, [RMotor, LMotor]);

  return (
    <>
      <Head>
        <title>Video Stream</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-slate-900 w-full h-full flex justify-evenly items-center">
        <Slider value={LMotor} setValue={setLMotor} />
        <h1 className="absolute bottom-0 bg-slate-900 px-4 m-4 rounded-full">
          FPS: {fps}
        </h1>
        <img
          src={imgB64}
          className="p-3 rounded-3xl h-full"
          alt="live image from rasPi"
        />
        <Slider value={RMotor} setValue={setRMotor} />
      </main>
    </>
  );
}
