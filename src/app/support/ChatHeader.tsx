import { IUser } from "./types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronLeft, ChevronRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUsersContext } from "../context/store";
interface ChatHeaderProps {
  selectedUser: IUser | null;
  typingUser: string | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const ChatHeader = ({
  selectedUser,
  typingUser,
  isSidebarOpen,
  toggleSidebar,
}: ChatHeaderProps) => {
  const { users } = useUsersContext();
  const loggedInUser = users.find(
    (user: IUser) => user.username === selectedUser?.username
  );


  return (
    <Card className="flex items-center justify-between p-4 bg-red-600 rounded-none border-none shadow-sm">
      <div className="flex items-center gap-x-2">
        <MessageSquare className="w-6 h-6 text-white" />
        <h1 className="text-xl text-white font-bold">Dump Bonds</h1>
      </div>

      {loggedInUser && (
        <div className="flex items-center gap-x-3">
          <Avatar className="h-8 w-8 border-2 border-white/20">
            <AvatarFallback className="bg-red-700 text-white">
              {loggedInUser.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-white font-medium">
              {loggedInUser.username}
            </span>

            {typingUser ? (
              <div className="flex items-center gap-x-1.5">
                <span className="typing-indicator text-gray-50">
                  typing <span className="dot">.</span>
                  <span className="dot">.</span>
                  <span className="dot">.</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-x-1.5">
                <span className="relative flex h-2 w-2">
                  {loggedInUser.onlineStatus && (
                    <>
                      <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </>
                  )}
                </span>
                <span className="text-xs text-white/90">
                  {loggedInUser.onlineStatus ? "Active" : "offline"}
                </span>
              </div>
            )}
          </div>
          
        </div>
      )}

      <Button
        onClick={toggleSidebar}
        className="p-2 rounded-md bg-red-700 lg:hidden mr-1"
      >
        {isSidebarOpen ? <ChevronLeft size={30} /> : <ChevronRight size={30} />}
      </Button>
    </Card>
  );
};
