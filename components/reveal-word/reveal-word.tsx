"use client";

import { GUESS_LIMIT, UseWordContext } from "@/context/word-context";

const RevealWord = () => {
  const { word, guesses, usersGuesses } = UseWordContext();

  const hasUserGuessedWord = usersGuesses.some(
    (row) =>
      row.length === 5 &&
      row.every((letter) => letter.correctPosition === letter.position),
  );

  if (hasUserGuessedWord) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 items-center">
          <p className="font-bold text-2xl">congrats you guessed {word}</p>
        </div>
      </div>
    );
  }

  if (guesses === GUESS_LIMIT) {
    return (
      <div className="flex flex-col">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="font-bold text-2xl">Game over!</h2>
          <p className="font-bold text-2xl">the word was {word}</p>
        </div>
      </div>
    );
  }
};

export default RevealWord;
