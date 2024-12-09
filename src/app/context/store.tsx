"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IMessage, IUser } from "../support/types";

// user context
interface ContextProps {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
}

const initialState: IUser = {
  _id: "",
  username: "",
  socketId: "",
  isAdmin: false,
  onlineStatus: false,
};

const UserContext = createContext<ContextProps>({
  user: initialState,
  setUser: () => {},
});

export const UserContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser>(initialState);

  useEffect(() => {
    const currUser: string | null = localStorage.getItem("user");
    if (currUser) {
      setUser((prevUser) => ({
        ...prevUser,
        username: currUser,
      }));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "Sorry, a user context must be within a user  context provider"
    );
  }
  return context;
};

//newMessage context

interface NewMessageContextProps {
  newMessage: IMessage;
  setNewMessage: React.Dispatch<React.SetStateAction<IMessage>>;
}

const initialMessageState: IMessage = {
  _id: "",
  content: "",
  sender: "",
  receiver: "",
  conversationId: "",
  fileUrl: "",
  timestamp: new Date(),
};

const NewMessageContext = createContext<NewMessageContextProps>({
  newMessage: initialMessageState,
  setNewMessage: () => {},
});

export const NewMessageContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [newMessage, setNewMessage] = useState<IMessage>(initialMessageState);

  return (
    <NewMessageContext.Provider value={{ newMessage, setNewMessage }}>
      {children}
    </NewMessageContext.Provider>
  );
};

// message context hook

export const useNewMessageContext = () => {
  const context = useContext(NewMessageContext);

  if (!context) {
    throw new Error(
      "A new Message context must be within a new Messages Context provider"
    );
  }

  return context;
};

// chat context
interface IData {
  user: string | null;
  sender?: string;
  receiver?: string;
}

interface ChatContextProp extends IData {
  setData: React.Dispatch<React.SetStateAction<IData>>;
}

const initialChatState: IData = {
  user: "",
  sender: "",
  receiver: "",
};

const ChatContext = createContext<ChatContextProp>({
  ...initialChatState,
  setData: () => {},
});

export const ChatContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<IData>(initialChatState);
  useEffect(() => {
    const currUser = localStorage.getItem("user");
    if (currUser) {
      setData((prevData) => ({
        ...prevData,
        user: currUser,
        sender: currUser,
      }));
    }
  }, []);
  return (
    <ChatContext.Provider value={{ ...data, setData }}>
      {children}
    </ChatContext.Provider>
  );
};
// chat context hook
export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error(
      "sorry chat context must be within a chat context provider"
    );
  }
  return context;
};

//open context for toast notification

interface OpenContextProps {
  Open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialOpenState = false;

const OpenContext = createContext<OpenContextProps>({
  Open: initialOpenState,
  setOpen: () => {},
});

export const OpenContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Open, setOpen] = useState(initialOpenState);
  return (
    <OpenContext.Provider value={{ Open, setOpen }}>
      {children}
    </OpenContext.Provider>
  );
};

export const useIsOpenContext = () => {
  const context = useContext(OpenContext);
  if (!context) {
    throw new Error(
      "sorry and open context must be with an open context provider"
    );
  }
  return context;
};

//users context
// interface IUserArr
interface UsersContextProps {
  users: IUser[];
  setUsers: React.Dispatch<React.SetStateAction<IUser[]>>;
}

const initialUser: IUser = {
  _id: "",
  username: "",
  socketId: "",
  isAdmin: false,
  onlineStatus: false,
};
const usersContext = createContext<UsersContextProps>({
  users: [initialUser],
  setUsers: () => {},
});

export const UsersContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<IUser[]>([initialUser]);

  return (
    <usersContext.Provider value={{ users, setUsers }}>
      {children}
    </usersContext.Provider>
  );
};

export const useUsersContext = () => {
  const context = useContext(usersContext);

  if (!context) {
    throw new Error("Error context must be within a users context provider");
  }
  return context;
};
