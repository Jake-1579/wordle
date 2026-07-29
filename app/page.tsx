import Keyboard from "@/components/keyboard/keyboard";
import Title from "../components/title/title";
import Grid from "@/components/grid/grid";
import FetchChosenWord from "@/actions/words-catalogue";
import { WordProvider } from "@/context/word-context";
import RevealWord from "@/components/reveal-word/reveal-word";

export default async function Home() {
  const word = await FetchChosenWord();

  return (
    <div className="flex flex-col flex-1 items-center font-sans bg-background p-6 gap-10">
      <WordProvider word={word}>
        <Title title="Wordle App" />
        <RevealWord />
        <Grid />
        <Keyboard />
      </WordProvider>
    </div>
  );
}
