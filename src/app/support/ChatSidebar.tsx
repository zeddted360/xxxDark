import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { IUser } from "./types";
import { useChatContext, useUsersContext } from "../context/store";

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
  const { user: USER, setData } = useChatContext();
  const { setUsers } = useUsersContext();

  useEffect(() => {
    let currUser = localStorage.getItem("username");
    if (currUser)
      setData((prev) => ({ ...prev, user: currUser, sender: currUser }));
  }, []);

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
      setUsers(data.message);
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
    <aside className="w-full max-w-[300px] border-r bg-gray-50 shadow-sm">
      <ScrollArea className="h-full p-4">
        {Users &&
          Users.filter((item) => item.username !== USER).map((user) => (
            <Card
              key={user._id}
              className={`p-4 flex items-center gap-4 mb-3 cursor-pointer transition-all hover:shadow-md hover:ring-1 hover:ring-gray-300 ${
                selectedUser && selectedUser._id === user._id
                  ? "bg-gray-200 ring-2 ring-blue-500"
                  : "bg-white"
              }`}
              onClick={() => {
                getConversation(USER, user.username);
                setSelectedUser(user);
              }}
            >
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="" alt={user.username} />
                      <AvatarFallback>
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user.username}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.username}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant={!user.onlineStatus ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {user.onlineStatus ? "Online" : "Offline"}
                  </Badge>
                </div>
              </div>
            </Card>
          ))}
      </ScrollArea>
    </aside>
  );
};
