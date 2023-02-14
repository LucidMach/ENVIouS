import { atomWithStorage } from "jotai/utils";

const ipAtom = atomWithStorage("ip", "");

export { ipAtom };
