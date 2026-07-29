import { FC } from "react";

interface TitleProps {
  title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
  return <h1 className="font-bold text-foreground text-4xl">{title}</h1>;
};

export default Title;
