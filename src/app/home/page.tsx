"use client";
import React, { useEffect } from "react";
import HeroSection from "../ui/HeroSection";
import ChatWindow from "../ui/Chat/Chat";
import TrendHack from "../ui/TrendHack";
import AllKind from "../ui/AllKind";
import CCTrack from "../ui/CCTrack";
import HList from "../ui/HList";
import SalesScale from "../ui/SalesScale";
import FlashingSoftware from "../ui/FlashSoftware";
import Rating from "../ui/Rating";
import WeAre from "../ui/WeAre";
import SocialH from "../ui/SocialH";
import { useNewMessageContext, useUserContext } from "../context/store";
import generateUsername from "../utils/utils";
// import { io } from "socket.io-client";
import { IMessage } from "../support/types";
import { socket } from "../support/Support";


const Page = () => {
  const { setUser } = useUserContext();
  const { newMessage,setNewMessage } = useNewMessageContext();
  useEffect(() => {
    socket.connect();

    const newUser = generateUsername();
    const existingUser = localStorage.getItem("username");

    if (!existingUser) {
      localStorage.setItem("username", newUser);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        username: existingUser,
      }));
    }
  }, [setUser]);

  useEffect(() => {
    const handleConnect = () => {
      const currentUsername = localStorage.getItem("username");
      if (currentUsername) {
        socket.emit("updateUser", {
          socketId: socket.id,
          username: currentUsername,
        });
      }

      setUser((prevUser) => ({
        ...prevUser,
        onlineStatus: true,
        socketId: socket.id || "",
        isAdmin: currentUsername === "xxxDark",
      }));

      console.log("A user just connected with id of:", socket.id);
    };

    const handleDisconnect = (reason: string) => {
      console.log("Socket disconnected " + socket.id, reason);
      setUser((prevUser) => ({
        ...prevUser,
        onlineStatus: false,
        socketId: socket.id || "",
        isAdmin: prevUser.username === "xxxDark",
      }));
    };

    socket.on("chat-message", (message: IMessage) => {
      console.log("Message received:", message);
      setNewMessage(message);
    });

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("chat-message");
      socket.disconnect();
    };
  }, [newMessage, setNewMessage, setUser]);

  return (
    <div>
      <HeroSection />
      <ChatWindow />
      <TrendHack />
      <AllKind />
      <CCTrack />
      <HList />
      <SalesScale />
      <FlashingSoftware />
      <Rating />
      <WeAre />
      <SocialH />
    </div>
  );
};

export default Page;
