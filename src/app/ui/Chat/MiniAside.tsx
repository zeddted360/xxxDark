import React, { useState, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Users } from "lucide-react";
import { IUser } from "@/app/support/types";
import { useChatContext, useUsersContext } from "@/app/context/store";

interface IMiniAsideProps {
  isSidebarOpen: boolean;
  currentUser: string | null;
  selectedUser: IUser | null;
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const MiniAside = ({
  isSidebarOpen,
  currentUser,
  selectedUser,
  setSelectedUser,
}: IMiniAsideProps) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { setData } = useChatContext();
  const { setUsers:setAllUsers } = useUsersContext();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        next: { revalidate: 0 },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data: { message: IUser[] } = await res.json();
      setUsers(data.message);
      setAllUsers (data.message);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredUsers = users
    .filter((user) => user.username !== currentUser)
    .filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <aside
      className={`border-r transition-all duration-300 overflow-hidden ${
        isSidebarOpen ? "w-80" : "w-0"
      }`}
    >
      <div className="flex flex-col h-full bg-gradient-to-b from-gray-50 to-white">
        {/* Header section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-gray-500" />
            <h2 className="font-semibold text-gray-700">Available Users</h2>
            <Badge variant="secondary" className="ml-auto">
              {filteredUsers.length}
            </Badge>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              className="pl-9 bg-white"
            />
          </div>
        </div>

        {/* Users list */}
        <ScrollArea className="flex-1 px-2">
          <div className="space-y-2 p-2">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <Card
                  key={user._id}
                  className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    selectedUser?._id === user._id
                      ? "bg-red-50 border-red-200"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setData({ user: currentUser, receiver: user.username,sender:currentUser ||'' });
                    setSelectedUser(user);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-red-100 text-red-700">
                        {user.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-700 truncate">
                        {user.username}
                      </p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            user.onlineStatus ? "bg-green-400" : "bg-gray-300"
                          }`}
                        />
                        <span
                          className={`text-xs ${
                            user.onlineStatus ? "text-green-600" : "text-gray-500"
                          }`}
                        >
                          {user.onlineStatus ? "Online" : "Offline"}
                        </span>
                      </div>
                    </div>
                    {selectedUser?._id === user._id && (
                      <Badge
                        variant="secondary"
                        className="bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        Active
                      </Badge>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="w-12 h-12 text-gray-300 mb-2" />
                <p className="text-gray-500 font-medium">No users found</p>
                <p className="text-gray-400 text-sm">
                  Try adjusting your search query
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
};

export default MiniAside;