import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "./types";
import { useChatContext } from "../hooks/useChatContext";

export const ChatSidebar = ({
  setSelectedUser,
  selectedUser,
  getConversation,
}: {
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  selectedUser: IUser | null;
  getConversation: (sender: string | null, receiver: string) => Promise<void>;
}) => {
  const [Users, SetUsers] = useState<IUser[] | null>(null);
  const { user: USER, } = useChatContext();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        next: { revalidate: 0 },
      });
      if (!res.ok) {
        throw new Error("Error: something went wrong");
      }
      const data: { message: IUser[] } = await res.json();
      SetUsers(data.message);
    } catch (error) {
      console.error(error instanceof Error && error.message);
    }
  };

  useEffect(() => {
    fetchUsers();

    const interval = setInterval(() => {
      fetchUsers();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <aside className="w-fit border-r shadow-lg bg-gray-100">
      <ScrollArea className="h-full">
        {Users &&
          Users.filter((item) => item.username !== USER).map((user) => (
            <div
              key={user._id}
              className={`p-4 px-2 flex items-center gap-3 rounded-b-md mb-1 cursor-pointer hover:bg-gray-400 hover:gray-red-950 ${
                selectedUser && selectedUser._id === user._id
                  ? "bg-gray-300 text-black"
                  : ""
              }`}
              onClick={() => {
                getConversation(USER, user.username);
                setSelectedUser(user);
              }}
            >
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="">
                <p className="font-medium">{user.username}</p>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      user.onlineStatus ? "bg-green-400" : "bg-gray-400"
                    }`}
                  />
                  <i className="text-xs text-gray-500">
                    {user.onlineStatus ? "Online" : "Offline"}
                  </i>
                </div>
              </div>
            </div>
          ))}
      </ScrollArea>
    </aside>
  );
};
