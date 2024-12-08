"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const [activeSection, setActiveSection] = useState("ch1");
  const router = useRouter();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev === "ch1" ? "ch2" : "ch1"));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="relative min-h-[calc(100vh-100px)]">
        {/* Chapter 1 */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            activeSection === "ch1"
              ? "opacity-100 z-10 scale-100"
              : "opacity-0 z-0 scale-110"
          }`}
        >
          {/* Mobile Background (visible below lg) */}
          <div className="lg:hidden absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
              style={{
                backgroundImage: "url('/darkone.jpg')",
                transform: activeSection === "ch1" ? "scale(1)" : "scale(1.1)",
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="container mx-auto h-full relative">
            {/* Mobile centered content */}
            <div className="lg:hidden h-full flex items-center justify-center relative z-50">
              <section
                className={`text-gray-50 text-center px-4 transition-all duration-1000 ${
                  activeSection === "ch1"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="darkone space-y-6 relative">
                  <div className="text-4xl font-bold tracking-wider">
                    DUMPBONDS
                  </div>
                  <div className="tested text-2xl font-light">
                    Tested
                    <span className="text-[crimson] ml-1 text-3xl font-bold">
                      and
                    </span>{" "}
                    Trusted
                  </div>
                  <div className="relative z-50">
                    <Button
                      onClick={() => router.push("/support")}
                      className="bg-[crimson] rounded-full hover:bg-[crimson]/90 font-bold text-black text-md px-8 py-6"
                    >
                      ORDER NOW
                    </Button>
                  </div>
                </div>
              </section>
            </div>

            {/* Rest of the desktop layout remains unchanged */}
            <div className="hidden lg:flex flex-row items-center justify-between gap-8 h-full">
              <section
                className={`w-1/2 text-gray-50 text-left p-8 relative z-10 transition-all duration-1000 ${
                  activeSection === "ch1"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="darkone space-y-6">
                  <div className="text-5xl font-bold tracking-wider">
                    DUMPBONDS
                  </div>
                  <div className="tested text-3xl font-light">
                    Tested{" "}
                    <span className="text-[crimson] text-3xl font-bold">
                      and
                    </span>{" "}
                    Trusted
                  </div>
                  <Button
                    onClick={() => router.push("/support")}
                    className="bg-[crimson] rounded-full hover:bg-[crimson]/90 font-bold text-black text-md px-8 py-6"
                  >
                    ORDER NOW
                  </Button>
                </div>
              </section>

              <div className="w-1/2 h-full relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
                  style={{
                    backgroundImage: "url('/darkone.jpg')",
                    transform:
                      activeSection === "ch1" ? "scale(1)" : "scale(1.1)",
                  }}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Chapter 2 - Apply the same changes to Chapter 2 */}
        <div
          className={`absolute inset-0 transition-all duration-1000 ${
            activeSection === "ch2"
              ? "opacity-100 z-10 scale-100"
              : "opacity-0 z-0 scale-110"
          }`}
        >
          <div className="lg:hidden absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
              style={{
                backgroundImage: "url('/darkthree.jpg')",
                transform: activeSection === "ch2" ? "scale(1)" : "scale(1.1)",
              }}
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>

          <div className="container mx-auto h-full relative">
            {/* Mobile centered content */}
            <div className="lg:hidden h-full flex items-center justify-center relative z-50">
              <section
                className={`text-gray-50 text-center px-4 transition-all duration-1000 ${
                  activeSection === "ch2"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
              >
                <div className="darkone space-y-6 relative">
                  <div className="text-4xl font-bold tracking-wider">
                    DUMPBONDS
                  </div>
                  <div className="tested text-2xl font-light">
                    Cool <span className="text-[crimson] font-medium">Web</span>
                  </div>
                  <div className="relative z-50">
                    <Button
                      variant={"outline"}
                      onClick={() => router.push("/support")}
                      className="bg-transparent rounded-full hover:bg-[crimson]/90 font-bold text-white text-md px-8 py-6"
                    >
                      ORDER NOW
                    </Button>
                  </div>
                </div>
              </section>
            </div>

            {/* Desktop layout remains unchanged */}
            <div className="hidden lg:flex flex-row items-center justify-between gap-8 h-full">
              <section
                className={`w-1/2 text-gray-50 text-left p-8 relative z-10 transition-all duration-1000 ${
                  activeSection === "ch2"
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-10"
                }`}
              >
                <div className="darkone space-y-6">
                  <div className="text-5xl font-bold tracking-wider">
                    DUMPBONDS
                  </div>
                  <div className="tested text-3xl font-light">
                    Cool <span className="text-[crimson] font-medium">Web</span>
                  </div>
                  <Button
                    variant={"outline"}
                    onClick={() => router.push("/support")}
                    className="bg-transparent rounded-full hover:bg-[crimson]/90 font-bold text-white text-md px-8 py-6"
                  >
                    ORDER NOW
                  </Button>
                </div>
              </section>

              <div className="w-1/2 h-full relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
                  style={{
                    backgroundImage: "url('/darkthree.jpg')",
                    transform:
                      activeSection === "ch2" ? "scale(1)" : "scale(1.1)",
                  }}
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-20">
          <button
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeSection === "ch1" ? "bg-[crimson]" : "bg-white/50"
            }`}
            onClick={() => setActiveSection("ch1")}
          />
          <button
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              activeSection === "ch2" ? "bg-[crimson]" : "bg-white/50"
            }`}
            onClick={() => setActiveSection("ch2")}
          />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
