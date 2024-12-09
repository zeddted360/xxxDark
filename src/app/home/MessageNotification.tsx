"use client";
import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { FileText, MessageSquare } from "lucide-react";
import {
  useIsOpenContext,
  useNewMessageContext,
  useUserContext,
} from "../context/store";

const ChatNotification = () => {
  const { toast } = useToast();
  const { newMessage } = useNewMessageContext();
  const { Open } = useIsOpenContext();
  const { user } = useUserContext();
  const { fileUrl, content, sender } = newMessage;

  useEffect(() => {
    if (!Open && sender !== user.username && (content || fileUrl)) {
      toast({
        duration: 4000,
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
          </div>
        ),
      });
    }
  }, [Open, content, fileUrl, sender, newMessage, toast]);

  return null;
};

export default ChatNotification;
