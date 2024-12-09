import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IMessage } from "./types";
import { useEffect, useRef, useState } from "react";
import { ChatInput } from "./ChatInput";
import Image from "next/image";
import { FileIcon,  FileTextIcon, Download } from "lucide-react";
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
import { socket } from "../home/page";
import { useChatContext } from "../context/store";

export const ChatMessages = ({
  conversationId,
}: {
  conversationId: string;
}) => {
  const { user } = useChatContext();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (conversationId) {
      fetch(`http://localhost:8080/api/messages/${conversationId}`)
        .then((res) => res.json())
        .then((data: { message: IMessage[] }) => setMessages(data.message))
        .catch((error) => console.error(error));
    }
  }, [conversationId]);

  const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    socket.on("chat-message", (message) => {
      setMessages((prevMessages) => {
        if (prevMessages.some((msg) => msg._id === message._id)) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    });

    return () => {
      socket.off("chat-message");
    };
  }, []);

  const addMessage = (newMessage: IMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const getFileType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(`.${extension}`)) return 'image';
    if (['.mp4', '.webm', '.mov'].includes(`.${extension}`)) return 'video';
    if (['.pdf'].includes(`.${extension}`)) return 'pdf';
    if (['.doc', '.docx'].includes(`.${extension}`)) return 'document';
    return 'other';
  };

  const MediaContent = ({ fileUrl }: { fileUrl: string }) => {
    const fileType = getFileType(fileUrl);
    const fullUrl = `http://localhost:8080${fileUrl}`;

    switch (fileType) {
      case 'image':
        return (
          <HoverCard>
            <HoverCardTrigger>
              <div className="relative group">
                <Image
                  src={fullUrl}
                  width={200}
                  height={200}
                  alt="uploaded image"
                  className="rounded-md transition-transform duration-200 group-hover:scale-105"
                  objectFit="cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-md" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              <Image
                src={fullUrl}
                width={400}
                height={400}
                alt="preview"
                className="rounded-lg"
                objectFit="contain"
              />
            </HoverCardContent>
          </HoverCard>
        );
      case 'video':
        return (
          <div className="relative max-w-sm rounded-lg overflow-hidden">
            <video
              controls
              className="w-full rounded-lg"
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
                  className="gap-2 hover:bg-accent text-gray-900"
                  onClick={() => window.open(fullUrl, '_blank')}
                >
                  {fileType === 'pdf' && <FileTextIcon className="w-4 h-4" />}
                  {fileType === 'document' && <FileIcon className="w-4 h-4" />}
                  {fileType === 'other' && <Download className="w-4 h-4" />}
                  Download File
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Click to download</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
    }
  };

  return (
    <>
      <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-gray-50 to-white">
        {Array.isArray(messages) && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg._id || index}
                className={`flex mb-4 ${
                  msg.sender === user ? "justify-end" : "justify-start"
                } animate-in slide-in-from-bottom-2`}
              >
                <div className="max-w-[80%]">
                  <Card
                    className={`p-4 ${
                      msg.sender === user
                        ? "bg-red-600 text-red-50 rounded-t-xl rounded-bl-xl"
                        : "bg-gray-100 text-gray-900 rounded-t-xl rounded-br-xl"
                    } shadow-sm transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="space-y-2">
                      {msg.fileUrl && (
                        <div className="mb-2">
                          <MediaContent fileUrl={msg.fileUrl} />
                        </div>
                      )}
                      {msg.content && (
                        <p className="whitespace-pre-wrap break-words">
                          {msg.content}
                        </p>
                      )}
                    </div>
                  </Card>
                  <div className="mt-1 flex items-center gap-2">
                    <small className={`text-xs ${msg.sender === user ? "text-gray-600" : "text-gray-500"}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </small>
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-lg text-gray-500">No messages yet</p>
              <p className="text-sm text-gray-400">Start a conversation!</p>
            </div>
          </div>
        )}
      </ScrollArea>
      <ChatInput setMessages={addMessage} conversationId={conversationId} />
    </>
  );
};