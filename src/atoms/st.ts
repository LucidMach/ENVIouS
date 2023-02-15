import { atomWithStorage } from "jotai/utils";

const stAtom = atomWithStorage<"camera" | "lidar" | "none">("st", "none");

export { stAtom };
