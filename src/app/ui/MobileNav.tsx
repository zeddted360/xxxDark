import React from "react";
import { links } from "../home/links";
import Link from "next/link";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ChevronRight, X } from "lucide-react";

const MobileNav = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Sheet open={true} onOpenChange={() => setIsOpen(false)}>
      <SheetContent side="left" className="w-[300px] bg-black p-0">
        <ScrollArea className="h-full px-4">
          <div className="pt-8 pb-6">
            <h2 className="px-4 text-lg font-bold tracking-tight flex justify-between items-center text-gray-50 mb-4">
              <span>Navigation</span>
              <Button  onClick={()=>setIsOpen(false)}>
                <X size={18} />
              </Button>
            </h2>
            <Separator className="mb-4 bg-gray-800" />
            <div className="flex flex-col space-y-2">
              {links.map((item, index) => (
                <Link key={index} href={item.url}>
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-gray-50 hover:bg-gray-800/50 hover:text-red-500 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-base">{item.title}</span>
                    <ChevronRight size={18} className="opacity-50" />
                  </Button>
                  {index < links.length - 1 && (
                    <Separator className="my-1 bg-gray-800/50" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
