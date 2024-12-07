"use client";
import React, { useState } from "react";
import Link from "next/link";
import { links } from "../index.html/links";
import MobileNav from "./MobileNav";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div
        id="header"
        className={`header bg-black px-8 flex justify-between z-50 text-gray-50 fixed w-full top-0 ${pathname ==='/support' && 'hidden'}`}
      >
        <div className="siteName">
          <h1 className="DUMPBONDS text-2xl text-gray-50 font-extrabold">
            DUMPBONDS
          </h1>
        </div>

        <div
          className="desktopNavBar hidden lg:flex justify-around items-center gap-4"
        >
          {links.map((item, index) => (
            <Link
              className="block hover:border-b-2 border-red-600 px-3 py-2"
              key={index}
              href={item.url}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <button
          onClick={handleToggle}
          className="sideNavigation p-2 cursor-pointer lg:hidden"
        >
          {isOpen ? (
            <X size={30} className="text-gray-50" />
          ) : (
            <Link href={"#navMobile"}>
              <Menu size={30} className="text-gray-50" />
            </Link>
          )}
        </button>
      </div>
      {isOpen && <MobileNav setIsOpen={ setIsOpen } />}
    </>
  );
};

export default Header;
