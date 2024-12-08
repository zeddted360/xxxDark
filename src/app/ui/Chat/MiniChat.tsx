import React, { useState, useEffect, } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";

import MiniHeader from "./MiniHeader";
import MiniAside from "./MiniAside";
import MiniMain from "./MiniMain";
import { IUser } from "@/app/support/types";
import { socket } from "@/app/support/Support";
import { useChatContext } from "@/app/hooks/useChatContext";

const ChatInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const { user } = useChatContext();
  useEffect(() => {
    setCurrentUser(localStorage.getItem("user"));
  }, []);

  useEffect(() => {
    socket.disconnect();
    socket.connect();

    socket.on("connect", () => {

      if (user) {
        socket.emit("updateUser", { socketId: socket.id, username: user });
      }
    });

    socket.on("disconnect", (reason) => {
      console.log("socket is disconnected " + socket.id, reason);
    });

    socket.on("typing", (typingUser) => {
      setTypingUser(typingUser);
      setTimeout(() => setTypingUser(null), 3000);
    });

    return () => {
      socket.off("connect");
      socket.off("chat-message");
      socket.off("typing");
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) setIsExpanded(false);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center gap-2 px-4 py-2"
        >
          <span>Chat</span>
          <MessageCircle size={18} />
        </Button>
      </div>
    );
  }

  const chatWindowClass = `
    fixed z-50 bg-transparent transition-all duration-300 bottom-6 right-6
    ${
      isMobile
        ? "w-full h-[80vh]"
        : isExpanded
        ? "inset-4"
        : "w-[500px] h-[600px]"
    }
  `;

  return (
    <Card className={chatWindowClass}>
      {/* header */}
      <MiniHeader
        selectedUser={selectedUser}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        isMobile={isMobile}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        typingUser={typingUser}
      />
      {/* side bar */}
      <div className="flex flex-1 h-[calc(100%-4rem)] overflow-hidden bg-white">
        <MiniAside
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isSidebarOpen={isSidebarOpen}
          currentUser={currentUser}
        />
        {/* chat body */}
        <MiniMain selectedUser={selectedUser} currentUser={currentUser} />
      </div>
    </Card>
  );
};

export default ChatInterface;
