import React, { createContext, useState, useEffect, useCallback } from "react";
import { IMessage } from "../support/types";

interface MessageContextValue {
  message: IMessage; // Changed: Wrap the message in a separate property
  setNewMessage: (value: IMessage) => void;
  resetMessage: () => void;
}

const initialState: IMessage = {
  _id: "",
  content: "",
  receiver: "",
  conversationId: "",
  sender: "",
  fileUrl: "",
  timestamp: new Date(),
};

// Changed: Separate the message from the context methods
export const MessageContext = createContext<MessageContextValue>({
  message: initialState,
  setNewMessage: () => {},
  resetMessage: () => {},
});

export const MessageContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [message, setMessage] = useState<IMessage>(initialState);

  useEffect(() => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        setMessage((prevState) => ({
          ...prevState,
          sender: user,
        }));
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, []);

  const setNewMessage = useCallback((newMessage: IMessage) => {
    setMessage(newMessage);
  }, []);

  const resetMessage = useCallback(() => {
    setMessage(initialState);
  }, []);

  // Changed: Separate the message state from the methods
  const value = {
    message,
    setNewMessage,
    resetMessage,
  };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};
