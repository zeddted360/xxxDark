import { useContext } from "react";
import { MessageContext } from "../context/MessageContext";


export const useMessageContext = () => {

  const context = useContext(MessageContext);

  if (!context) {
    throw new Error(
      "useMessageContext must be used within a MessageContextProvider"
    );
  }

  return context;
};
