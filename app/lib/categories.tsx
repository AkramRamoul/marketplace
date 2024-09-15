import { ChefHat, Globe, PartyPopper } from "lucide-react";
import { ReactNode } from "react";

interface IAppProps {
  name: string;
  title: string;
  image: ReactNode;
  id: number;
}

export const CategoryItems: IAppProps[] = [
  {
    id: 0,
    name: "template",
    title: "Template",
    image: <Globe />,
  },
  {
    id: 1,
    name: "uikit",
    title: "Ui Kit",
    image: <ChefHat />,
  },
  {
    id: 2,
    name: "icon",
    title: "Icon",
    image: <PartyPopper />,
  },
];
