import axios from "axios";
import Link from "next/link";
import { useAtom } from "jotai";
import { ipAtom } from "@/atoms/ip";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const buttonCSS =
  "bg-yellow-200 text-slate-900 rounded-full px-6 py-2 cursor-pointer";

const Home: React.FC = () => {
  const [ip, setIp] = useAtom(ipAtom);
  const [localIP, setLocalIP] = useState<string>();
  useEffect(() => {
    axios.get("/api/localip").then((res) => {
      setLocalIP(res.data.ip);
    });
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-10">
      <div className="text-center">
        <img src="/icon.png" alt="logo" width={300} />
        <p className="text-yellow-200 font-semibold text-3xl font-mono">
          ENVIouS
        </p>
      </div>
      <input
        type="text"
        value={ip}
        onChange={(e) => {
          setIp(e.target.value);
        }}
        className="rounded-full min-w-[300px] w-1/4 px-6 py-2 text-center text-yellow-200 border-2 border-yellow-200"
        placeholder="enter ip address of the robot"
      />
      <div className="flex gap-3">
        <Link className={buttonCSS} href="/rosless">
          ROS(Less) Version
        </Link>
        <Link className={buttonCSS} href="/rosbridge">
          ROS Bridge Version
        </Link>
      </div>
      <div className="bg-white p-2">
        <QRCodeSVG value={`http://${localIP}:3000/rosbridge`} />
      </div>
      <div className="absolute bottom-0 underline text-yellow-300 flex gap-1">
        <a href="https://github.com/lucidmach/envious" target="_blank">
          github
        </a>
        <p>|</p>
        <a
          target="_blank"
          href="https://lucidmach.notion.site/Environment-Visualisation-Software-for-TurtleBot3-based-Robots-6062216d246843988fec1abf3205e6b4"
        >
          progress
        </a>
        <p>|</p>
        <a target="_blank" href="https://lucidmach.tech/">
          contact
        </a>
      </div>
    </div>
  );
};

export default Home;
