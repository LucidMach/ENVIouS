import Link from "next/link";
import { useAtom } from "jotai";
import { ipAtom } from "@/atoms/ip";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import NAV from "@/components/nav";
import Footer from "@/components/footer";

const buttonCSS =
  "bg-yellow-200 text-black text-center rounded-full px-6 py-2 cursor-pointer w-1/3 hover:bg-yellow-300";

const Home: React.FC = () => {
  const [ip, setIp] = useAtom(ipAtom);
  const [currentURL, setCurrentURL] = useState("");
  const [isPWA, setIsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>();

  useEffect(() => {
    setCurrentURL(window.location.href);
    // PWA install stuff
    const isInStandaloneMode = () =>
      window.matchMedia("(display-mode: standalone)").matches;
    if (isInStandaloneMode()) {
      setIsPWA(true);
    }

    window.addEventListener("beforeinstallprompt", (e: any) => {
      e.preventDefault;
      setPromptInstall(e);
    });
  }, []);

  return (
    <>
      <Head>
        <title>envious | home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="h-full flex flex-col justify-between items-center bg-slate-900">
        <NAV />
        <div className="w-1/2 min-w-[300px] flex flex-col justify-center items-center gap-10 bg-slate-900">
          <div className="w-full">
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
            <div className="mobile-landscape:hidden bg-white p-2 w-fit">
              <QRCodeSVG value={currentURL} />
            </div>
            <p className="mobile-landscape:hidden text-sm text-center">
              scan to open on another device
            </p>
          </>
          {ip.type === "localip" ? (
            <>
              <input
                type="text"
                value={ip.localIP}
                onChange={(e) => {
                  setIp({ ...ip, localIP: e.target.value });
                }}
                className="rounded-full w-full px-6 py-2 text-center bg-slate-900 text-yellow-200 border-2 border-yellow-200"
                placeholder="enter ip address of the robot"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                value={ip.ngrokURL}
                onChange={(e) => {
                  if (e.target.value.includes("https://"))
                    e.target.value = e.target.value.split("https://")[1];
                  setIp({ ...ip, ngrokURL: e.target.value });
                }}
                className="rounded-full w-full px-6 py-2 text-center bg-slate-900 text-yellow-200 border-2 border-yellow-200"
                placeholder="enter ngrok url from the robot"
              />
            </>
          )}
          <Link className={buttonCSS} href="/rosbridge">
            CONNECT
          </Link>
          <Link className="text-xs underline text-yellow-500" href="/faq">
            need help setting your ros robot up? check out the faq section
          </Link>
        </div>
        <div className="w-full">
          {!isPWA ? (
            <div className="bg-slate-800 rounded-t-lg w-full flex px-6 py-2 items-center justify-between gap-2">
              <img
                className="rounded-xl"
                src="/maskable_icon.png"
                width={45}
                alt="installation button"
              />
              <p className="text-xs sm:text-sm">this app is installable</p>
              <button
                onClick={(e) => {
                  setIsPWA(true);
                  e.preventDefault();
                  if (promptInstall) {
                    promptInstall.prompt();
                  }
                }}
                className="bg-yellow-300 hover:bg-yellow-400 text-slate-900 rounded-full px-6 pw-2"
              >
                install
              </button>
            </div>
          ) : null}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Home;
