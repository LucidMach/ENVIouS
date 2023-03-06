import { control } from "@/interfaces/control";
import { atomWithStorage } from "jotai/utils";

const ctAtom = atomWithStorage<control>("ct", "sliders");

export { ctAtom };
