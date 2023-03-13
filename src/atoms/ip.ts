import { atomWithStorage } from "jotai/utils";

interface ip {
  type: "localip" | "ngrok";
  localIP: string;
  ngrokURL: string;
  value: string;
}

const ipAtom = atomWithStorage<ip>("ip", {
  type: "localip",
  localIP: "",
  ngrokURL: "",
  value: "",
});

export { ipAtom };
