"use client";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import ChatNotification from "./home/MessageNotification";

const ToastUi = () => {
  return (
    <>
      <Toaster />
      <ChatNotification />
    </>
  );
};

export default ToastUi;
