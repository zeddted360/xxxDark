"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TrendHack() {
  const router = useRouter();
  return (
    <div id="trending" className="flex p-2 gap-x-4">
      {/* image for lg screens */}
      <div
        style={{ backgroundImage: "url('/darktwo.jpg') " }}
        className="p-4 w-1/2 hidden lg:block inset-0 rounded-md bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
      ></div>

      <div className="trendHack flex flex-col pt-8 text-gray-50 px-4 gap-y-4">
        <div className="logs flex items-center justify-start gap-x-4">
          <h2 className="text-gray-50 font-bold text-lg uppercase">Logs</h2>
          <span className=" text-muted-foreground">$500-$3,000</span>
        </div>
        <div className="credit-cards flex items-center justify-start gap-x-4">
          <h2 className="text-gray-50 font-bold text-lg uppercase">
            Credit Cards
          </h2>
          <span className=" text-muted-foreground">$50-$1,000</span>
        </div>
        <div className="dumps flex items-center justify-start gap-x-4">
          <h2 className="text-gray-50 font-bold text-lg uppercase">Dumps</h2>
          <span className=" text-muted-foreground">$50-$1,000</span>
        </div>
        <div className="tracks flex items-center justify-start gap-x-4">
          <h2 className="text-gray-50 font-bold text-lg uppercase">Tracks</h2>
          <span className=" text-muted-foreground">$50-$1,000</span>
        </div>
        <div className="flashingSoftware flex items-center justify-start gap-x-4">
          <h2 className="text-gray-50 font-bold text-lg uppercase">
            Flashing Software
          </h2>
          <span className=" text-muted-foreground">$1000-$5,000</span>
        </div>
        <div className="socialMediaHack flex items-center justify-start gap-x-4">
          <h2 className="text-gray-50 font-bold text-lg uppercase">
            Social Media Hack
          </h2>
          <span className=" text-muted-foreground">$10-$300</span>
        </div>
        <div className="sold text-lg">
          <span className="text-[crimson] font-bold">1,200</span> +{" "}
          <span>Product Sold</span>
        </div>
        <Button
          onClick={() => router.push("/support")}
          className="text-gray-950 uppercase font-bold w-1/2 bg-[crimson] rounded-full"
        >
          Buy true
        </Button>
      </div>
    </div>
  );
}
