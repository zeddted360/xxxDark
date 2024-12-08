"use client"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function WeAre() {
  const router = useRouter();
  return (
    <div
      style={{
        backgroundImage: "url('/weare.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
      className="min-h-[300px] w-full mt-8 text-gray-50 text-center gap-4 flex flex-col justify-center items-center p-8"
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-50">
        We are <span className="text-[crimson]">Available</span> 24/7
      </h1>
      <Button onClick={()=>router.push('/support')} className="rounded-full bg-[crimson]  uppercase font-bold text-black">
        Order Now
      </Button>
    </div>
  );
}
