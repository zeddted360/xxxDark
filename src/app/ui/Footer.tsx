"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/support " || pathname === "/") return null

  return (
    <footer className="text-center text-lg text-gray-50 font-bold p-8">
      &copy; {2010} DUMPBONDS
    </footer>
  );
}
