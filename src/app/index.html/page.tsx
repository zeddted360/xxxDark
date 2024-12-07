import React from "react";
import HeroSection from "../ui/HeroSection";
import ChatWindow from "../ui/Chat/Chat";
import TrendHack from "../ui/TrendHack";
import AllKind from "../ui/AllKind";
import CCTrack from "../ui/CCTrack";
import HList from "../ui/HList";
import SalesScale from "../ui/SalesScale";
import FlashingSoftware from "../ui/FlashSoftware";
import Rating from "../ui/Rating";
import WeAre from "../ui/WeAre";
import SocialH from "../ui/SocialH";

const Page = () => {
  return (
    <main className="bg-black pt-10 w-full relative overflow-hidden">
        <HeroSection />
        <ChatWindow />
        <TrendHack />
        <AllKind />
        <CCTrack />
        <HList />
        <SalesScale />
        <FlashingSoftware />
        <Rating />
        <WeAre />
        <SocialH />
    </main>
  );
};

export default Page;
