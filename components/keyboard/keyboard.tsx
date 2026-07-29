"use client";

import { UseWordContext } from "@/context/word-context";

const Keyboard = () => {
  const keyboardRows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "delete"],
  ];

  const { captureLetterPress } = UseWordContext();

  return (
    <div className="border-2 border-foreground p-3 flex flex-col gap-4 items-center">
      {keyboardRows.map((row, index) => (
        <div className="flex gap-4" key={index}>
          {row.map((letter, index) => (
            <span
              className="bg-foreground text-background font-bold text-lg py-6 px-10 cursor-pointer"
              title={letter}
              key={index}
              onClick={() => captureLetterPress(letter)}
            >
              {letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
