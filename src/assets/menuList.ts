import { ReactNode } from "react";

interface IMenu {
  key: string;
  icon: ReactNode;
  text: string;
  path: string;
  children: IMenu[];
}

export default {

}