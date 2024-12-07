"use client";
import React, { useState } from "react";
import { hList } from "../index.html/hLists";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HList() {
  const router = useRouter();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full p-4">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hList.map((item, i) => (
          <div
            onClick={() => router.push("/support")}
            key={i}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="flex flex-col items-center justify-center p-6 bg-gray-900 hover:bg-[crimson] rounded-lg transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-40 w-40 mb-4 rounded-lg overflow-hidden">
              <Image
                fill
                src="/skull.jpg"
                alt="type"
                className="object-cover"
              />
            </div>
            <h3 className="text-gray-50 text-lg text-center uppercase font-bold mb-2 line-clamp-2">
              {item.title}
            </h3>
            <div
              className={`h-[2px] w-10 mb-3 transition-colors duration-300 ${
                hoveredIndex === i ? "bg-black" : "bg-[crimson]"
              }`}
            ></div>
            <p className="text-gray-50 font-bold text-2xl">{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
