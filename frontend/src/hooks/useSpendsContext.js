import { SpendsContext } from "../context/SpendsContext";
import { useContext } from "react";

export const useSpendsContext = () => {
  const context = useContext(SpendsContext)

  if (!context) {
    throw Error('useSpendsContext must be used inside a SpendsContextProvider');
  }

  return context
}