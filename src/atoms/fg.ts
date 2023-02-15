import { atomWithStorage } from "jotai/utils";

const fgAtom = atomWithStorage("fg", { hue: "yellow", value: 400 });

export { fgAtom };
