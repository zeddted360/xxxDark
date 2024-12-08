// "use client";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function TrendHack() {
//   const router = useRouter();
//   return (
//     <div id="trending" className="flex p-2 gap-x-4 mb-4">
//       {/* image for lg screens */}
//       <div
//         style={{ backgroundImage: "url('/darktwo.jpg') " }}
//         className="p-4 w-1/2 hidden lg:block inset-0 rounded-md bg-cover bg-center bg-no-repeat transform transition-transform duration-1000"
//       ></div>

//       <div className="trendHack flex flex-col pt-8 text-gray-50 px-4 gap-y-4">
//         <h1 className="text-gray-50 font-bold text-2xl md:text-4xl">
//           Trend Hack
//         </h1>

//         <div className="logs flex items-center justify-start gap-x-4">
//           <h2 className="text-gray-50 font-bold text-lg uppercase">Logs</h2>
//           <span className=" text-muted-foreground">$500-$3,000</span>
//         </div>
//         <div className="credit-cards flex items-center justify-start gap-x-4">
//           <h2 className="text-gray-50 font-bold text-lg uppercase">
//             Credit Cards
//           </h2>
//           <span className=" text-muted-foreground">$50-$1,000</span>
//         </div>
//         <div className="dumps flex items-center justify-start gap-x-4">
//           <h2 className="text-gray-50 font-bold text-lg uppercase">Dumps</h2>
//           <span className=" text-muted-foreground">$50-$1,000</span>
//         </div>
//         <div className="tracks flex items-center justify-start gap-x-4">
//           <h2 className="text-gray-50 font-bold text-lg uppercase">Tracks</h2>
//           <span className=" text-muted-foreground">$50-$1,000</span>
//         </div>
//         <div className="flashingSoftware flex items-center justify-start gap-x-4">
//           <h2 className="text-gray-50 font-bold text-lg uppercase">
//             Flashing Software
//           </h2>
//           <span className=" text-muted-foreground">$1000-$5,000</span>
//         </div>
//         <div className="socialMediaHack flex items-center justify-start gap-x-4">
//           <h2 className="text-gray-50 font-bold text-lg uppercase">
//             Social Media Hack
//           </h2>
//           <span className=" text-muted-foreground">$10-$300</span>
//         </div>
//         <div className="sold text-lg">
//           <span className="text-[crimson] font-bold">1,200</span> +{" "}
//           <span>Product Sold</span>
//         </div>
//         <Button
//           onClick={() => router.push("/support")}
//           className="text-gray-950 uppercase font-bold w-1/2 bg-[crimson] rounded-full"
//         >
//           Buy now
//         </Button>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface CountUpAnimationProps {
  end: number;
  isVisible: boolean;
}

const CountUpAnimation: React.FC<CountUpAnimationProps> = ({
  end,
  isVisible,
}) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const increment = end / (duration / 16); // 60 FPS

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return <span>{count.toLocaleString()}</span>;
};

interface Service {
  name: string;
  price: string;
}

const TrendHack: React.FC = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const componentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  const services: Service[] = [
    { name: "Logs", price: "$500-$3,000" },
    { name: "Credit Cards", price: "$50-$1,000" },
    { name: "Dumps", price: "$50-$1,000" },
    { name: "Tracks", price: "$50-$1,000" },
    { name: "Flashing Software", price: "$1,000-$5,000" },
    { name: "Social Media Hack", price: "$10-$300" },
  ];

  return (
    <div
      ref={componentRef}
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
    >
      <Card className="bg-gray-900 overflow-hidden border-none">
        <CardContent className="p-0">
          <div className="flex flex-col lg:flex-row">
            {/* Image section */}
            <div
              style={{ backgroundImage: "url('/darktwo.jpg')" }}
              className="lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat transform transition-all duration-500 hover:scale-105"
            />

            {/* Content section */}
            <div className="flex-1 p-6 lg:p-8 space-y-6">
              <h1 className="text-gray-50 font-bold text-3xl md:text-5xl lg:text-6xl tracking-tight">
                Trend Hack
              </h1>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <div
                    key={service.name}
                    className="bg-gray-800/50 p-4 rounded-lg transition-all duration-300 hover:bg-gray-800"
                  >
                    <h2 className="text-gray-50 font-bold text-lg uppercase mb-2">
                      {service.name}
                    </h2>
                    <span className="text-gray-400">{service.price}</span>
                  </div>
                ))}
              </div>

              <div className="text-2xl md:text-3xl font-bold">
                <span className="text-[crimson]">
                  <CountUpAnimation end={1200} isVisible={isVisible} />
                </span>
                <span className=" text-gray-50 ml-2"> + Products Sold</span>
              </div>

              <Button
                onClick={() => router.push("/support")}
                className="w-full sm:w-auto px-8 py-6 text-lg  bg-[crimson] hover:bg-red-500/90 text-red-950 uppercase font-bold rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Buy now
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendHack;
