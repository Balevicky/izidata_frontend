import { log } from "node:console";

export const initProdActions = () => {
  if (process.env.NODE_ENV !== "development") {
    console.log = () => {};
  }
};
