import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IMessage, IUser } from "@/app/support/types";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  FileIcon,
  FileTextIcon,
  Download,
  Clock,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MiniFooter from "./MiniFooter";
import { useChatContext } from "@/app/hooks/useChatContext";
import { IConversation } from "@/app/support/types";
import { socket } from "@/app/support/Support";
import { useMessageContext } from "@/app/hooks/useMessageContext";

interface IMiniMain {
  selectedUser: IUser | null;
  currentUser: string | null;
}

const MiniMain = ({ selectedUser, currentUser }: IMiniMain) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<IMessage | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user,  receiver } = useChatContext();
  const [conversationId, setConversationId] = useState<string>("");
  const { setNewMessage } = useMessageContext();

  useEffect(() => {
    if (receiver && user) {
      fetch(`http://localhost:8080/api/conversations/${user}_${receiver}`)
        .then((res) => res.json())
        .then((data: { message: IConversation[] }) => {
          if (data.message?.[0]?._id) setConversationId(data.message[0]._id);
        })
        .catch((error) =>
          console.error(error instanceof Error && error.message)
        );
    }
  }, [user, receiver]);

  useEffect(() => {
    if (conversationId) {
      fetch(`http://localhost:8080/api/messages/${conversationId}`)
        .then((res) => res.json())
        .then((data: { message: IMessage[] }) => {
          // Ensure messages is always an array
          setMessages(Array.isArray(data.message) ? data.message : []);
        })
        .catch((error) => {
          console.error(error);
          setMessages([]); // Set empty array on error
        });
    }
  }, [conversationId]);

  useEffect(() => {
    socket.on("chat-message", (message) => {
      setMessages((prevMessages) => {
        // Ensure prevMessages is an array before using array methods
        const messageArray = Array.isArray(prevMessages) ? prevMessages : [];
        if (messageArray.some((msg) => msg._id === message._id)) {
          return messageArray;
        }
        return [...messageArray, message];
      });
      setNewMessage(message);
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (newMessage: IMessage) => {
    setMessages((prevMessages) => [
      ...(Array.isArray(prevMessages) ? prevMessages : []),
      newMessage,
    ]);
  };

  const getFileType = (url: string) => {
    const extension = url.split(".").pop()?.toLowerCase();
    if ([".jpg", ".jpeg", ".png", ".gif"].includes(`.${extension}`))
      return "image";
    if ([".mp4", ".webm", ".mov"].includes(`.${extension}`)) return "video";
    if ([".pdf"].includes(`.${extension}`)) return "pdf";
    if ([".doc", ".docx"].includes(`.${extension}`)) return "document";
    return "other";
  };

  const MediaContent = ({ fileUrl }: { fileUrl: string }) => {
    const fileType = getFileType(fileUrl);
    const fullUrl = `http://localhost:8080${fileUrl}`;

    switch (fileType) {
      case "image":
        return (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative group">
                <Image
                  src={fullUrl}
                  width={300}
                  height={300}
                  alt="uploaded image"
                  className="rounded-lg object-cover transition-transform duration-300 group-hover:scale-105 max-h-[300px]"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-auto p-0">
              <Image
                src={fullUrl}
                width={500}
                height={500}
                alt="preview"
                className="rounded-lg object-contain max-h-[500px] w-auto"
              />
            </HoverCardContent>
          </HoverCard>
        );
      case "video":
        return (
          <div className="relative max-w-sm rounded-lg overflow-hidden bg-black/5 p-2">
            <video
              controls
              className="w-full rounded-lg shadow-sm"
              preload="metadata"
            >
              <source src={fullUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        );
      default:
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 hover:bg-accent/10 text-current transition-all duration-200"
                  onClick={() => window.open(fullUrl, "_blank")}
                >
                  {fileType === "pdf" ? (
                    <FileTextIcon className="w-4 h-4" />
                  ) : fileType === "document" ? (
                    <FileIcon className="w-4 h-4" />
                  ) : (
                    <Download className="w-4 h-4" />
                  )}
                  Download File
                </Button>
              </TooltipTrigger>
              <TooltipContent>Click to download</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  const renderContent = () => {
    if (!selectedUser) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-400">
          <MessageCircle className="w-12 h-12" />
          <div className="text-center space-y-1">
            <p className="text-lg font-medium">Welcome to Chat</p>
            <p className="text-sm">Select a user to start messaging</p>
          </div>
        </div>
      );
    }

    if (!Array.isArray(messages) || messages.length === 0) {
      return (
        <div className="h-full flex flex-col items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
            <MessageCircle className="w-8 h-8 text-red-400" />
          </div>
          <div className="text-center space-y-1">
            <p className="text-lg font-medium text-gray-700">No messages yet</p>
            <p className="text-sm text-gray-500">
              Start the conversation with {selectedUser.username}!
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6 px-4">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender === currentUser;
          const showAvatar =
            !isCurrentUser &&
            (!messages[index - 1] || messages[index - 1].sender !== msg.sender);

          return (
            <div
              key={msg._id || index}
              className={`flex items-end gap-2 ${
                isCurrentUser ? "justify-end" : "justify-start"
              } animate-in slide-in-from-bottom-2 duration-200`}
            >
              {!isCurrentUser && showAvatar && (
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-100 text-blue-700">
                    {selectedUser.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[70%] ${
                  !isCurrentUser && !showAvatar ? "ml-10" : ""
                }`}
              >
                <Card
                  className={`p-3 shadow-sm hover:shadow transition-all duration-200 border-0 ${
                    isCurrentUser
                      ? "bg-red-600 text-red-50 rounded-t-2xl rounded-l-2xl"
                      : "bg-gray-100 text-gray-900 rounded-t-2xl rounded-r-2xl"
                  }`}
                >
                  <div className="space-y-2">
                    {msg.fileUrl && (
                      <div className="mb-2">
                        <MediaContent fileUrl={msg.fileUrl} />
                      </div>
                    )}
                    {msg.content && (
                      <p className="whitespace-pre-wrap break-words leading-relaxed">
                        {msg.content}
                      </p>
                    )}
                  </div>
                </Card>

                <div
                  className={`mt-1 flex items-center gap-2 ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex items-center gap-1 text-gray-500">
                    <Clock className="w-3 h-3" />
                    <small className="text-xs">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>
    );
  };

  return (
    <main className="flex-1 flex flex-col min-w-0">
      <ScrollArea className="flex-1 py-6 bg-gradient-to-b from-gray-50 to-white">
        {renderContent()}
      </ScrollArea>
      <MiniFooter
        message={message}
        setMessage={setMessage}
        selectedUser={selectedUser}
        setMessages={addMessage}
        conversationId={conversationId}
      />
    </main>
  );
};

export default MiniMain;
