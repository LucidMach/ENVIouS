import { sensor } from "@/interfaces/sensors";
import { atomWithStorage } from "jotai/utils";

const stAtom = atomWithStorage<sensor>("st", "none");

export { stAtom };
