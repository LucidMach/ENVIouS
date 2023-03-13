import { bgAtom } from "@/atoms/bg";
import { fgAtom } from "@/atoms/fg";
import { useAtom } from "jotai";
import { useState } from "react";
import Menu from "./expandableMenu";

const Settings: React.FC = () => {
  const [open, setOpen] = useState(true);

  const [bg, setBG] = useAtom(bgAtom);
  const [fg, setFG] = useAtom(fgAtom);

  return (
    <>
      <div
        className={`absolute z-20 top-6 right-4 p-2 rounded-lg flex flex-col gap-4 bg-${fg.hue}-${fg.value} fill-${bg.hue}-${bg.value}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="self-end cursor-pointer"
          onClick={(e) => setOpen(!open)}
        >
          <path d="M24 13.616v-3.232c-1.651-.587-2.693-.752-3.219-2.019v-.001c-.527-1.271.1-2.134.847-3.707l-2.285-2.285c-1.561.742-2.433 1.375-3.707.847h-.001c-1.269-.526-1.435-1.576-2.019-3.219h-3.232c-.582 1.635-.749 2.692-2.019 3.219h-.001c-1.271.528-2.132-.098-3.707-.847l-2.285 2.285c.745 1.568 1.375 2.434.847 3.707-.527 1.271-1.584 1.438-3.219 2.02v3.232c1.632.58 2.692.749 3.219 2.019.53 1.282-.114 2.166-.847 3.707l2.285 2.286c1.562-.743 2.434-1.375 3.707-.847h.001c1.27.526 1.436 1.579 2.019 3.219h3.232c.582-1.636.749-2.69 2.027-3.222h.001c1.262-.524 2.12.101 3.698.851l2.285-2.286c-.743-1.563-1.375-2.433-.848-3.706.527-1.271 1.588-1.44 3.221-2.021zm-12 3.384c-2.762 0-5-2.239-5-5s2.238-5 5-5 5 2.239 5 5-2.238 5-5 5zm3-5c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3z" />
        </svg>
        {open ? <Menu /> : null}
      </div>
    </>
  );
};

export default Settings;
