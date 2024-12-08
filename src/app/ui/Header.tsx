"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { links } from "../home/links";
import MobileNav from "./MobileNav";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  console.log(isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        id="header"
        className={`header transition-all duration-300 px-8 flex justify-between z-50 text-gray-50 fixed w-full top-0 
          ${pathname === "/support" && "hidden"}
          ${
            scrolled
              ? "bg-black/90 backdrop-blur-md shadow-lg py-2"
              : "bg-black py-4"
          }`}
      >
        <div className="siteName flex items-center">
          <Link href="/">
            <h1 className="DUMPBONDS text-2xl md:text-3xl text-gray-50 font-black tracking-tighter transition-colors duration-200 hover:text-red-500">
              DUMPBONDS
            </h1>
          </Link>
        </div>

        <div className="desktopNavBar hidden lg:flex justify-around items-center gap-6">
          {links.map((item, index) => (
            <React.Fragment key={index}>
              <Link className="group relative px-3 py-2" href={item.url}>
                <span className="relative z-10 text-sm font-medium transition-colors duration-200 hover:text-red-500">
                  {item.title}
                </span>
                <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-red-600 transition-all duration-200 group-hover:w-full" />
              </Link>
              {index < links.length - 1 && (
                <Separator orientation="vertical" className="h-4 bg-gray-700" />
              )}
            </React.Fragment>
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={handleToggle}
          className="lg:hidden hover:bg-gray-800"
        >
          {isOpen ? (
            <X size={24} className="text-gray-50" />
          ) : (
            <Link href={"#navMobile"}>
              <Menu size={24} className="text-gray-50" />
            </Link>
          )}
        </Button>
      </div>
      {isOpen && <MobileNav setIsOpen={setIsOpen} />}
    </>
  );
};

export default Header;
