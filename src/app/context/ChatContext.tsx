import React, { createContext, useEffect, useState } from "react";

interface IData {
  user: string | null;
  sender?: string;
  receiver?: string;
}

interface IChat extends IData {
  setData: (value: IData) => void;
}

export const ChatContext = createContext<IChat>({
  user: "",
  sender: "",
  receiver: "",
  setData: () => {},
});

const initialState = { user: "", sender: "", receiver: "" };

export const ChatContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<IData>(initialState);
  useEffect(() => {
    const sender = localStorage.getItem("user");
    if (sender) {
      setData({ user: sender, sender, receiver: "" });
    }
  }, []);

  return (
    <ChatContext.Provider value={{ ...data, setData }}>
      {children}
    </ChatContext.Provider>
  );
};
