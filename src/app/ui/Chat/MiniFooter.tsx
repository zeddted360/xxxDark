import { IMessage, IUser } from "@/app/support/types";
import React, { useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X, Image, File, Smile } from "lucide-react";
import { useChatContext } from "@/app/hooks/useChatContext";
import { socket } from "@/app/support/Support";
import EmojiPicker from "./Emoji";
import { useMessageContext } from "@/app/hooks/useMessageContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface IMiniFooter {
  message: IMessage | null;
  setMessage: React.Dispatch<React.SetStateAction<IMessage | null>>;
  selectedUser: IUser | null;
  setMessages: (newMessage: IMessage) => void;
  conversationId: string;
}

const MiniFooter = ({
  message,
  setMessage,
  selectedUser,
  setMessages,
  conversationId,
}: IMiniFooter) => {
  const { user, receiver } = useChatContext();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { message: i, setNewMessage } = useMessageContext();
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
    setUploadProgress(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:8080/api/upload");

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      };

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          resolve(response.fileUrl);
        } else {
          reject(new Error("Upload failed"));
        }
      };

      xhr.onerror = () => reject(new Error("Network error"));
      xhr.send(formData);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hasContent = content.trim().length > 0;
    const hasFile = !!file;

    if ((!hasContent && !hasFile) || !user || !receiver) {
      return;
    }

    try {
      let fileUrl = "";
      if (file) {
        fileUrl = await uploadFile(file);
      }

      const newMessage: IMessage = {
        content: content.trim(),
        sender: user,
        receiver,
        conversationId,
        timestamp: new Date(),
        fileUrl,
      };
      setMessages(newMessage);
      socket.emit("chat-message", newMessage);
      new Audio("/beep.mp3").play();
      setNewMessage(newMessage);

      setContent("");
      setFile(null);
      setUploadProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const isImage = file?.type.startsWith("image/");

  return (
    <footer className="p-4 border-t bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-4xl mx-auto">
        {file && (
          <Card className="mb-3 p-3">
            <div className="flex items-center gap-3">
              {isImage ? (
                <Image className="h-5 w-5 text-blue-500" />
              ) : (
                <File className="h-5 w-5 text-blue-500" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {uploadProgress !== null && (
                  <div className="mt-2">
                    <Progress value={uploadProgress} className="h-1" />
                  </div>
                )}
              </div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-500 hover:text-gray-700"
                      onClick={removeFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove file</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Card>
        )}
        {selectedUser && (
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <Input
              type="file"
              className="hidden"
              id="file-upload"
              ref={fileInputRef}
              onChange={handleFile}
              accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.mp4,.3gp"
            />
            <div className="flex items-center gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <label
                      htmlFor="file-upload"
                      className={cn(
                        "inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors",
                        "hover:bg-gray-100 cursor-pointer",
                        file && "text-blue-500"
                      )}
                    >
                      <Paperclip className="h-5 w-5" />
                    </label>
                  </TooltipTrigger>
                  <TooltipContent>Attach file</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={file ? "Add a caption..." : "Type a message..."}
              className="flex-1 bg-white"
              onInput={() => {
                if (user) socket.emit("typing", { typingUser: user });
              }}
            />
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                      onClick={() => setIsEmojiOpen(!isEmojiOpen)}
                    >
                      <Smile className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Add emoji</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      size="icon"
                      className={cn(
                        "h-10 w-10 rounded-full",
                        (!content.trim() && !file) || !user || !receiver
                          ? "opacity-50"
                          : "hover:bg-blue-600"
                      )}
                      disabled={
                        (!content.trim() && !file) || !user || !receiver
                      }
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </form>
        )}
        {isEmojiOpen && (
          <div className="absolute bottom-full right-4 mb-2">
            <EmojiPicker
              onEmojiSelect={(emoji) => {
                setContent((prev) => prev + emoji);
                setIsEmojiOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </footer>
  );
};

export default MiniFooter;
