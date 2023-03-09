import { atomWithStorage } from "jotai/utils";

const fgAtom = atomWithStorage("fg", { hue: "yellow", value: 400 });
const fgHexAtom = atomWithStorage("fgHex", "#14b8a6");
const secHexAtom = atomWithStorage("secHex", "#14b8a6");
const tertHexAtom = atomWithStorage("tertHex", "#14b8a6");

export { fgAtom, fgHexAtom, secHexAtom, tertHexAtom };
