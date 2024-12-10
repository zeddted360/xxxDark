import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChevronRight, ArrowRight } from "lucide-react";

interface Section {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  accent: string;
}

interface Sections {
  [key: string]: Section;
}

type ActiveSection = "ch1" | "ch2";

const HeroSection = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("ch1");
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev === "ch1" ? "ch2" : "ch1"));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sections: Sections = {
    ch1: {
      title: "DUMPBONDS",
      subtitle: "Tested and Trusted",
      description: "Web tools available",
      image: "/darkone.jpg",
      accent: "bg-gradient-to-r from-rose-500 to-pink-500",
    },
    ch2: {
      title: "DUMPBONDS",
      subtitle: "Dark Web",
      description: "Hacking tools available",
      image: "/darkthree.jpg",
      accent: "bg-gradient-to-r from-violet-500 to-purple-500",
    },
  };

  const currentSection: Section = sections[activeSection];

  return (
    <div className="relative w-full h-[calc(100vh-100px)] overflow-hidden bg-black">
      {/* Background with parallax effect */}
      {Object.entries(sections).map(([key, section]) => (
        <div
          key={key}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            activeSection === key
              ? "opacity-100 scale-100"
              : "opacity-0 scale-110"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform transition-transform duration-[2000ms]"
            style={{
              backgroundImage: `url('${section.image}')`,
              transform: activeSection === key ? "scale(1.05)" : "scale(1)",
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full container mx-auto px-4">
        <div className="h-full flex flex-col justify-center max-w-4xl">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Animated badge */}
            <div
              className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium
              ${
                activeSection === "ch1"
                  ? "bg-rose-500/10 text-rose-200"
                  : "bg-violet-500/10 text-violet-200"
              }
              transition-colors duration-500`}
            >
              <span className="mr-2">✨</span>
              <span>Dark Web</span>
            </div>

            {/* Title with gradient animation */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
              {currentSection.title}
              <div
                className={`h-2 mt-2 rounded ${currentSection.accent} transition-all duration-500`}
                style={{ width: "60px" }}
              />
            </h1>

            {/* Subtitle with animated highlight */}
            <p className="text-2xl md:text-3xl text-gray-300 font-light">
              {currentSection.subtitle.split(" ").map((word, i) => (
                <span key={i} className="inline-block">
                  {i === 1 ? (
                    <span
                      className={`${
                        activeSection === "ch1"
                          ? "text-rose-400"
                          : "text-violet-400"
                      } font-medium mx-2 transition-colors duration-500`}
                    >
                      {word}
                    </span>
                  ) : (
                    <span className="mx-1">{word}</span>
                  )}
                </span>
              ))}
            </p>

            {/* Description */}
            <p className="text-gray-400 max-w-xl text-lg">
              {currentSection.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => router.push("/support")}
                className={`${
                  activeSection === "ch1"
                    ? "bg-[crimson] hover:bg-rose-600"
                    : "bg-violet-500 hover:bg-violet-600"
                } text-white rounded-full px-8 py-6 text-lg transition-colors duration-500`}
              >
                Order Now
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {(["ch1", "ch2"] as const).map((section) => (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section
                  ? section === "ch1"
                    ? "bg-rose-500 scale-125"
                    : "bg-violet-500 scale-125"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
