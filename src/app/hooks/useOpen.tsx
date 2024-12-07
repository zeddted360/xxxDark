import { useContext } from "react";
import { OpenContext } from "../context/OpenContext";

export const useOpenContext = () => {
  const context = useContext(OpenContext);

  if (!context) {
    throw new Error(
      "sorry Context must me be wrapped within an openChatContext provider"
    );
  } else {
    return context;
  }
};
