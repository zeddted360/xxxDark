import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, X } from "lucide-react";
import EmojiPicker from "../ui/Chat/Emoji";
import { IMessage } from "./types";
import { useChatContext } from "../context/store";
import { socket } from "./Support";
// import { socket } from "../home/page";

export const ChatInput = ({
  setMessages,
  conversationId,
}: {
  setMessages: (newMessage: IMessage) => void;
  conversationId: string;
}) => {
  const { user, receiver } = useChatContext();
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      xhr.open("POST", "https://api.darkdumps.org/api/upload");

      // Track upload progress
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

  return (
    <footer className="p-4 border-t bg-gray-100">
      {file && (
        <div className="flex items-center gap-2 mb-2 p-2 bg-white rounded">
          <div className="flex-1">
            <span className="text-sm truncate">{file.name}</span>
            {uploadProgress !== null && (
              <div className="w-full bg-gray-200 rounded mt-1">
                <div
                  className="bg-blue-500 h-1 rounded"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input
          type="file"
          className="hidden"
          id="file-upload"
          ref={fileInputRef}
          onChange={handleFile}
          accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.mp4,.3gp"
        />
        <label
          htmlFor="file-upload"
          className={`hover:bg-gray-200 p-2 rounded cursor-pointer transition-colors ${
            file ? "text-blue-500" : ""
          }`}
        >
          <Paperclip className="h-5 w-5" />
        </label>
        <Input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={file ? "Add a caption..." : "Type a message..."}
          className="flex-1"
          onInput={() => {
            if (user) socket.emit("typing", { typingUser: user });
          }}
        />
        <EmojiPicker
          onEmojiSelect={(emoji) => setContent((prev) => prev + emoji)}
        />
        <Button
          type="submit"
          size="icon"
          disabled={(!content.trim() && !file) || !user || !receiver}
        >
          <Send className="h-5 w-5" />
        </Button>
      </form>
    </footer>
  );
};

export default ChatInput;
