export const controlOptions = ["sliders", "buttons", "keyboard"] as const;
export type control = typeof controlOptions[number];
