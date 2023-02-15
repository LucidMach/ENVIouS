import { atomWithStorage } from "jotai/utils";

const bgAtom = atomWithStorage("bg", { hue: "slate", value: 900 });

export { bgAtom };
