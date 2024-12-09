"use client"
import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";
import ChatInterface from "./MiniChat";
import { useIsOpenContext } from "@/app/context/store";

const ChatWindow = () => {
  const [isOnline, setIsOnline] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { Open, setOpen } = useIsOpenContext();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setOpen(false);
        setIsFullScreen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const containerClass = isFullScreen
    ? "fixed z-50 inset-0 w-full h-fit bg-transparent"
    : isMobile
    ? "fixed z-50 bottom-0 right-0 w-full h-fit md:w-[30rem] md:h-[30rem] md:bottom-6 md:right-6"
    : "fixed z-50 bottom-6 right-6 w-[30rem] h-[30rem]";

  
  return (
        <div
          className={`transition-all duration-300  h-fit  ${containerClass}`}
        >
          {!Open ? (
            <div className="fixed bottom-6 right-6">
              <button
                onClick={() => {
              setOpen(true);
              setOpen(true);
                }}
                className="bg-[crimson] text-white px-4 py-2 rounded-full flex items-center  shadow-lg hover:bg-orange-600 transition-colors relative"
              >
                {isOnline && (
                  <div className="absolute  bottom-1 left-1 flex items-center ">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute"></div>
                  </div>
                )}
                <div className="flex items-center gap-x-2">
                  <span>Chat</span>
                  <MessageCircle className="w-5 h-5" />
                </div>
              </button>
            </div>
          ) : (
            <div
              className={`bg-gray-50  rounded-lg shadow-lg w-full overflow-hidden
              ${isFullScreen ? "h-screen" : "h-full"}
              ${isMobile && !isFullScreen ? "rounded-b-none" : ""}
            `}
            >
              <ChatInterface />
            </div>
          )}
        </div>
  );
};

export default ChatWindow;
