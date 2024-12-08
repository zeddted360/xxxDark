import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMessageContext } from "../hooks/useMessageContext";
import { FileText, MessageSquare } from "lucide-react";

const ChatNotification = () => {
  const { toast } = useToast();
  const { message } = useMessageContext();

  useEffect(() => {
    const { fileUrl, content, sender } = message;
    const hasNewMessage = sender && (content || fileUrl);
    console.log("the message is ", message);

    if (hasNewMessage) {
      toast({
        duration: 400000,
        className:
          "bg-gray-50 text-gray-800 fixed top-4 right-4 w-72 cursor-pointer hover:bg-gray-100 transition-colors",
        title: (
          <div className="flex items-center gap-2">
            {fileUrl ? (
              <FileText className="h-4 w-4 text-crimson" />
            ) : (
              <MessageSquare className="h-4 w-4 text-crimson" />
            )}
            <span className="font-medium text-gray-900">{sender}</span>
          </div>
        ) as any,
        description: (
          <div className="space-y-1">
            {content && (
              <p className="text-gray-700 text-sm line-clamp-2">{content}</p>
            )}
            {fileUrl && (
              <p className="text-gray-700 text-sm italic">
                {content ? "Sent a file" : "New file shared"}
              </p>
            )}
            <p className="text-xs text-gray-500">Click to open chat</p>
          </div>
        ),
      });
    }
  }, [message.fileUrl, message.content, message.sender, message, toast]);

  return null;
};

export default ChatNotification;
