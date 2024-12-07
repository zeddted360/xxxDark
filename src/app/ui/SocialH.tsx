'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface IItem {
  title: string;
  price: number;
}

export default function SocialH() {
  const router = useRouter();
  const items: IItem[] = [
    {
      title: "hack a whatsapp account",
      price: 58,
    },
    {
      title: "telegram members/subscribers",
      price: 14,
    },
    {
      title: "web phishing",
      price: 250,
    },
    {
      title: "audiomack like, repups, follower, stream count",
      price: 15,
    },
    {
      title: "get your facebook accounts back",
      price: 95,
    },
    {
      title: "get your facebooks accounts back",
      price: 150,
    },
    {
      title: "verified x tick on twitter and instagram",
      price: 300,
    },
    {
      title: "youtube views and subscribers",
      price: 50,
    },
  ];

  return (
    <div id="social-media-hack" className="w-full p-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div
            onClick={()=> router.push('/support')}
            key={i}
            className="flex cursor-pointer flex-col items-center justify-center p-4 bg-gray-800 rounded-lg shadow-lg"
          >
            <div className="relative rounded-full overflow-hidden h-20 w-20 mb-4">
              <Image
                fill
                alt="image"
                src="/img4.jpg"
                className="object-cover"
              />
            </div>
            <h3 className="text-gray-50 text-md lg:text-xl text-center uppercase mb-2 line-clamp-2">
              {item.title}
            </h3>
            <p className="text-lg font-black text-gray-400">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
