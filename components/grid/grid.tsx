"use client";

import {
  GUESS_LIMIT,
  GuessDetails,
  UseWordContext,
} from "@/context/word-context";
import { FC } from "react";

interface GridProps {
  rows?: number;
  wordLength?: number;
}

const Grid: FC<GridProps> = ({ rows = 6, wordLength = 5 }) => {
  const generateIterableForRows = Array(rows).fill(null);
  const generatedIterableForWordLength = Array(wordLength).fill(null);
  const { usersGuesses, lettersInputted, guesses } = UseWordContext();
  const activeRow = guesses + 1;

  const calculateLetterStyling = (guessDetails?: GuessDetails): string => {
    if (!guessDetails) return "";

    const { hasMatch, correctPosition, position } = guessDetails;
    const positionsMatch = correctPosition === position;

    if (!hasMatch) {
      return "bg-black text-white";
    }

    if (hasMatch && positionsMatch) return "bg-green-300 text-white";

    if (hasMatch && !positionsMatch) return "bg-yellow-300 text-black";

    return "";
  };

  const getLetter = (rowIndex: number, wordIndex: number): string => {
    if (rowIndex === activeRow) return lettersInputted[wordIndex] ?? "";
    return usersGuesses?.[rowIndex]?.[wordIndex]?.letter ?? "";
  };

  return (
    <div className="flex flex-col gap-5">
      {generateIterableForRows.map((_, rowIndex) => (
        <div className="flex gap-5" key={rowIndex}>
          {generatedIterableForWordLength.map((_, wordIndex) => (
            <div
              className={`border-2 border-grey w-14 h-14 font-bold text-2xl justify-center ${calculateLetterStyling(usersGuesses?.[rowIndex]?.[wordIndex])}`}
              key={wordIndex}
            >
              {getLetter(rowIndex, wordIndex)}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
