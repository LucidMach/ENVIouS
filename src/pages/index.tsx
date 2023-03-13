import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useAtom } from "jotai";
import { ipAtom } from "@/atoms/ip";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

const buttonCSS =
  "bg-yellow-200 text-black text-center rounded-full px-6 py-2 cursor-pointer w-1/3 hover:bg-yellow-300";

const Home: React.FC = () => {
  const [ip, setIp] = useAtom(ipAtom);
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    axios.get("/api/localip").then((res) => {
      setIp({ ...ip, localIP: res.data.ip });
    });
    setCurrentURL(window.location.href);
  }, []);

  return (
    <div className="h-full flex flex-col justify-between bg-slate-900">
      <div className="w-full mt-4 flex flex-row items-center justify-center">
        <div className="border-yellow-300 bg-slate-900 z-10 border-2 p-1 rounded-full">
          <Image src="/icon.png" alt="logo" width={75} height={75} />
        </div>
        <div className="bg-yellow-300 text-black w-[90%] relative right-5 rounded-r-full py-2 px-6 flex flex-col items-end">
          <h1 className="text-base font-black">envious</h1>
          <h2 className="text-xs font-thin">user interface</h2>
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-10 bg-slate-900">
        <div className="w-1/3">
          <button
            onClick={() => setIp({ ...ip, type: "localip" })}
            className={`w-1/2 bg-yellow-${
              ip.type === "localip" ? 300 : 200
            } text-black px-3 py-2 rounded-l-full hover:bg-yellow-300`}
          >
            localIP
          </button>
          <button
            onClick={() => setIp({ ...ip, type: "ngrok" })}
            className={`w-1/2 bg-yellow-${
              ip.type === "ngrok" ? 300 : 200
            } text-black px-3 py-2 rounded-r-full hover:bg-yellow-300`}
          >
            ngrok
          </button>
        </div>
        <>
          <div className="bg-white p-2">
            <QRCodeSVG value={`${currentURL}rosbridge`} />
            <p className="text-sm text-center text-black">scan to open</p>
          </div>
        </>
        {ip.type === "localip" ? (
          <>
            <input
              type="text"
              value={ip.localIP}
              onChange={(e) => {
                setIp({ ...ip, localIP: e.target.value });
              }}
              className="rounded-full min-w-[300px] w-1/4 px-6 py-2 text-center bg-slate-900 text-yellow-200 border-2 border-yellow-200"
              placeholder="enter ip address of the robot"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              value={ip.ngrokURL}
              onChange={(e) => {
                setIp({ ...ip, ngrokURL: e.target.value });
              }}
              className="rounded-full min-w-[300px] w-1/4 px-6 py-2 text-center bg-slate-900 text-yellow-200 border-2 border-yellow-200"
              placeholder="enter ngrok url from the robot"
            />
          </>
        )}
        <Link className={buttonCSS} href="/rosbridge">
          CONNECT
        </Link>
      </div>
      <div className="bottom-2 underline bg-yellow-300 text-black flex gap-1 w-full justify-center">
        <a href="https://github.com/lucidmach/envious" target="_blank">
          github
        </a>
        <p>|</p>
        <a
          target="_blank"
          href="https://lucidmach.notion.site/Environment-Visualisation-Software-for-TurtleBot3-based-Robots-6062216d246843988fec1abf3205e6b4"
        >
          log
        </a>
        <p>|</p>
        <a target="_blank" href="https://lucidmach.tech/">
          contact
        </a>
        <p>|</p>
        <a target="_blank" href="https://www.buymeacoffee.com/lucidmach/">
          sponsor
        </a>
      </div>
    </div>
  );
};

export default Home;
