import React from "react";
import { links } from "../index.html/links";
import Link from "next/link";

const MobileNav = ({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      id="navMobile"
      className="mobile_navigation pt-10 px-2 p-2 bg-black text-gray-100 flex flex-col gap-2 my-2"
    >
      {links.map((item, index) => (
        <Link className="text-lg block" key={index} href={item.url}>
          <div className="w-fit">
            <span className="relative group inline-block">
              {item.title}
              <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-red-600 group-hover:w-full group-hover:left-0 transition-all duration-300" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
