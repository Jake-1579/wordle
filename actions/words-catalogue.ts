"use server";

const getFiveLetterWords = (wordCatalogue: string[]) => {
  return wordCatalogue.filter((word) => word.length === 5);
};

const FetchWordsCatalogue = async (): Promise<string[]> => {
  try {
    const res = await fetch(
      "https://puzzlecottage.com/data/wordle-valid-words.txt",
    );

    const text = await res.text();
    const wordCatalogue = text.split("\n");
    const words = getFiveLetterWords(wordCatalogue);

    return words || ["apple"];
  } catch {
    console.error("could not get words");
    return ["apple"];
  }
};

const FetchChosenWord = async (): Promise<string> => {
  const wordCatalogue = await FetchWordsCatalogue();
  return wordCatalogue[Math.floor(Math.random() * wordCatalogue.length)];
};

export default FetchChosenWord;
