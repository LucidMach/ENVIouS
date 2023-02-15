import { atomWithStorage } from "jotai/utils";

const ctAtom = atomWithStorage<"sliders" | "buttons">("ct", "sliders");

export { ctAtom };
