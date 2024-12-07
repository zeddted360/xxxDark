import React from "react";
import {
  Minimize2,
  Maximize2,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IUser } from "@/app/support/types";

interface IMiniHeaderProp {
  selectedUser: IUser | null;
  isExpanded: boolean;
  setIsExpanded: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  typingUser: string | null;
}

const MiniHeader = ({
  selectedUser,
  isExpanded,
  setIsExpanded,
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
  setIsOpen,
  typingUser,
}: IMiniHeaderProp) => {
  return (
    <div className="relative bg-gradient-to-r from-red-600 to-red-500 p-4 text-white rounded-t-lg shadow-md">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center bg-red-700/30 p-3 rounded-lg backdrop-blur-sm">
            <MessageCircle className="w-6 h-6 mr-2" />
            <h1 className="text-xl font-bold tracking-tight">Dump Bonds</h1>
          </div>

          {selectedUser && (
            <>
              <Separator orientation="vertical" className="h-8 bg-red-400/30" />
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-red-700/30 flex items-center justify-center">
                    <span className="text-lg font-semibold">
                      {selectedUser.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-red-500" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium">{selectedUser.username}</span>
                  {typingUser ? (
                    <Badge
                      variant="secondary"
                      className="bg-red-700/30 text-white hover:bg-red-700/40"
                    >
                      <span className="typing-indicator text-xs">
                        typing
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                        <span className="dot">.</span>
                      </span>
                    </Badge>
                  ) : (
                    <span className="text-xs text-red-100">Online</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-700/30 text-white"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  {isSidebarOpen ? (
                    <PanelLeftClose className="w-4 h-4" />
                  ) : (
                    <PanelLeftOpen className="w-4 h-4" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSidebarOpen ? "Hide sidebar" : "Show sidebar"}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {!isMobile && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-red-700/30 text-white"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? (
                      <Minimize2 className="w-4 h-4" />
                    ) : (
                      <Maximize2 className="w-4 h-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{isExpanded ? "Minimize" : "Maximize"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-red-700/30 text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Close</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
};

export default MiniHeader;