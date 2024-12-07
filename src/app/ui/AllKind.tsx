"use client"
import React, { useEffect, useState } from "react";

const HandwrittenGlowingLogs = () => {
  const [logsActiveIndex, setLogsActiveIndex] = useState(0);
  const [softwareActiveIndex, setSoftwareActiveIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const logsText = "LOGS";
  const softwareText = "ALL KINDS OF SOFTWARE";
  const logsLetters = logsText.split("");
  const softwareLetters = softwareText.split("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const logsInterval = setInterval(() => {
      setLogsActiveIndex((prev) => (prev + 1) % logsLetters.length);
    }, 1000);

    const softwareInterval = setInterval(() => {
      setSoftwareActiveIndex(
        (prev) => (prev + 1) % (softwareLetters.length + 1)
      );
    }, 1000);

    return () => {
      clearInterval(logsInterval);
      clearInterval(softwareInterval);
    };
  }, [logsLetters.length, softwareLetters.length]);

  const binaryStrings = ["10101", "01010", "11000", "00111", "10011", "01101"];

  // Create deterministic positions for binary rain
  const rainElements = [...Array(20)].map((_, i) => ({
    left: `${(i * 5) % 100}vw`,
    delay: `${-(i % 4)}s`,
    binary: binaryStrings[i % binaryStrings.length],
    duration: `${3 + (i % 3)}s`,
  }));

  return (
    <div
      id="logs"
      style={{
        backgroundImage: "url('/facedowm.avif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="relative flex items-center justify-center"
    >
      {/* Binary rain effect - now with deterministic positions */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {rainElements.map((elem, i) => (
            <div
              key={i}
              className="absolute text-red-500/40 font-mono text-lg"
              style={{
                left: elem.left,
                animation: `fall ${elem.duration} linear infinite`,
                animationDelay: elem.delay,
                top: "-20px",
                zIndex: 10,
              }}
            >
              {elem.binary}
            </div>
          ))}
        </div>
      )}

      {/* Main content container */}
      <div className="relative z-20 text-center">
        {/* Handwritten glowing LOGS text */}
        <h1 className="text-8xl tracking-wider font-['Shadows_Into_Light'] leading-relaxed mb-8">
          {logsLetters.map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-1000 
                ${
                  index === logsActiveIndex
                    ? "text-white scale-110"
                    : "text-red-500/50"
                }`}
              style={{
                textShadow:
                  index === logsActiveIndex
                    ? "0 0 10px #fff, 0 0 20px #fff, 0 0 30px #ff0000"
                    : "none",
                transform: mounted
                  ? `rotate(${(index * 2 - 1) * 0.5}deg)`
                  : "none",
                fontFamily: "'Shadows Into Light', cursive",
              }}
            >
              {letter}
            </span>
          ))}
        </h1>

        {/* ALL KINDS OF SOFTWARE text */}
        <div className="text-2xl font-mono tracking-wider">
          {softwareLetters.map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-500 ${
                index === softwareActiveIndex
                  ? "text-cyan-400 scale-110 animate-pulse"
                  : "text-white"
              } ${index < softwareActiveIndex ? "text-cyan-400" : ""}`}
              style={{
                textShadow:
                  index <= softwareActiveIndex
                    ? "0 0 10px #0ff, 0 0 20px #0ff, 0 0 30px #0ff"
                    : "none",
              }}
            >
              {letter}
            </span>
          ))}
              </div>
      </div>

      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.7;
          }
          100% {
            transform: translateY(100vh);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default HandwrittenGlowingLogs;
