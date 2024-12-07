"use client";
import { useState, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessages } from "./ChatMessages";
import { IConversation, IUser } from "./types";
import { io } from "socket.io-client";
import { useChatContext } from "../hooks/useChatContext";
import LoginUI from "../ui/Chat/Login";

export const socket = io("http://localhost:8080");

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [conversationId, setConverSationId] = useState("");
  const [typingUser, setTypingUser] = useState<string | null>(null);
  const [user, setUser] = useState<string | null>(null);
  const { setData } = useChatContext();

  useEffect(() => {
    setUser(localStorage.getItem("user"));
  }, []);

  const getConversation = async (sender: string | null, receiver: string) => {
    if (sender) setData({ user, sender, receiver });
    try {
      if (user) {
        const res = await fetch(
          `http://localhost:8080/api/conversations/${sender}_${receiver}`
        );
        if (!res.ok) throw new Error("Oops something went wrong!");
        const data: { message: IConversation[] } = await res.json();
        if (data.message[0]._id) {
          setConverSationId(data.message[0]._id);
        }
      }
    } catch (error) {
      console.error(error instanceof Error && error.message);
    }
  };

  useEffect(() => {
    socket.disconnect();
    socket.connect();

    socket.on("connect", () => {
      console.log(socket.id, "is connecting...");

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

  return (
    <div className="h-screen flex flex-col">
      {!user && <LoginUI user={user} setUser={setUser} />}
      <ChatHeader typingUser={typingUser} selectedUser={selectedUser} />

      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          getConversation={getConversation}
        />
        <main className="flex-1 flex flex-col">
          {selectedUser ? (
            <>
              <ChatMessages conversationId={conversationId} />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-500">
              Select a user to start chatting
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
