"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  // Conditionally render the footer based on the pathname
  if (pathname === "/support") return null;

  return (
    <footer className="text-center text-lg text-gray-50 font-bold p-8">
      &copy; {new Date().getFullYear()} DUMPBONDS
    </footer>
  );
}
