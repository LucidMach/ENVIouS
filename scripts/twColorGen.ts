// import { writeFileSync } from "fs";
// import path from "path";

const hue = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
];
const value = [0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const colorTypes = ["bg", "text", "border", "fill"];

const colors: string[] = [];

const allPossibleColorsTWCSS = async () => {
  colorTypes.forEach((ty) => {
    hue.forEach((col) => {
      value.forEach(async (val) => {
        colors.push(`${ty}-${col}-${val}`);

        if (ty === "fill" && col === "rose" && val === 900) {
          // fs.writeFileSync(
          //   path.join(".", "colors.json"),
          //   JSON.stringify(colors)
          // );
          await Deno.writeTextFile("./colors.json", JSON.stringify(colors));
          // console.log(colors);
        }
      });
    });
  });
};

allPossibleColorsTWCSS();

export default allPossibleColorsTWCSS;
