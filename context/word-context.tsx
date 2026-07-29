"use client";

import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

export const GUESS_LIMIT = 5;

interface WordContextProps {
  children: ReactNode;
  word: string;
}

interface DefaultContextValues {
  guesses: number;
  setGuesses: Dispatch<SetStateAction<number>>;
  word: string;
  captureLetterPress: (letter: string) => void;
  lettersInputted: string[];
  usersGuesses: GuessDetails[][];
}

export interface GuessDetails {
  hasMatch?: boolean;
  position: number;
  correctPosition?: number;
  letter: string;
  userActivelyInputting: boolean;
}

const defaultContext: DefaultContextValues = {
  word: "",
  setGuesses: () => {},
  guesses: -1,
  captureLetterPress: () => {},
  lettersInputted: [],
  usersGuesses: [],
};

const WordContext = createContext(defaultContext);

export const WordProvider: FC<WordContextProps> = ({ children, word }) => {
  const [guesses, setGuesses] = useState(-1);
  const [lettersInputted, setLettersInputted] = useState<string[]>([]);
  const [usersGuesses, setUsersGuesses] = useState<GuessDetails[][]>([]);

  const computedUserGuess = () => {
    const cloneOfLetters = [...lettersInputted];
    const sameLetterOccurences: string[] = [];

    return cloneOfLetters.map((letter, index) => {
      let sameLetterOccurenceIndex;
      if (sameLetterOccurences.includes(letter)) {
        console.log("oh letters already here ey");
        console.log(index);
        sameLetterOccurenceIndex = index;
      }

      sameLetterOccurences.push(letter);

      return {
        hasMatch: word.includes(letter),
        position: sameLetterOccurenceIndex
          ? sameLetterOccurenceIndex
          : cloneOfLetters.indexOf(letter),
        correctPosition: sameLetterOccurenceIndex
          ? sameLetterOccurenceIndex
          : word.indexOf(letter),
        letter: letter,
        userActivelyInputting: false,
      };
    });
  };

  const handleMatching = () => {
    setGuesses((prev) => prev + 1);
    setUsersGuesses((prev) =>
      [...prev, computedUserGuess()]
        .map((row) =>
          row.filter((guess) => guess.userActivelyInputting === false),
        )
        .filter((row) => row.length > 0),
    );

    setLettersInputted([]);
  };

  const captureLetterPress = (letter: string): void => {
    const normalisedLetter = letter.toUpperCase();
    const attemptGuess =
      normalisedLetter === "ENTER" && lettersInputted.length === 5;
    const hasRandomEnterKeyPressed = normalisedLetter === "ENTER";

    const currentAttemptedLetters = lettersInputted;

    if (
      lettersInputted.length === 5 &&
      normalisedLetter !== "ENTER" &&
      normalisedLetter !== "DELETE"
    )
      return;

    if (attemptGuess) {
      handleMatching();
      return;
    }

    if (hasRandomEnterKeyPressed) return;

    if (normalisedLetter === "DELETE") {
      console.log(currentAttemptedLetters);

      const removeLastLetterFromGuess =
        currentAttemptedLetters.slice(0, -1) ?? [];

      setLettersInputted([...removeLastLetterFromGuess]);
      return;
    }

    setLettersInputted((prev) => [...prev, normalisedLetter]);
  };

  return (
    <WordContext.Provider
      value={{
        guesses,
        setGuesses,
        usersGuesses,
        word,
        captureLetterPress,
        lettersInputted,
      }}
    >
      {children}
    </WordContext.Provider>
  );
};

export const UseWordContext = () => useContext(WordContext);
