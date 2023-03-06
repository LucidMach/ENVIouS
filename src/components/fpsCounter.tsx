import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

interface props {
  ROSimg: any;
  className?: string;
}

const FPScounter: React.FC<props> = ({ ROSimg, className }) => {
  const [bg, ____] = useAtom(bgAtom);
  const [fg, ___] = useAtom(fgAtom);

  // states to track fps
  const [prevTime, setPrev] = useState(Date.now());
  const [count, setCount] = useState(0);
  const [fps, setFPS] = useState(0);

  // FPS tracker
  useEffect(() => {
    setCount(count + 1);
    if (Date.now() - prevTime > 1000) {
      setFPS(count);
      setPrev(Date.now());
      setCount(0);
    }
  }, [ROSimg]);

  return (
    <>
      <div
        className={
          `bg-${fg.hue}-${fg.value} rounded-full px-2 text-${bg.hue}-${bg.value} ` +
          className
        }
      >
        FPS: {fps}
      </div>
    </>
  );
};

export default FPScounter;
