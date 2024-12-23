import Image from "next/image";
import Link from "next/link";
import React from "react";

const FlashingSoftware: React.FC = () => {
  return (
    <div
      id="flashing-software"
      className="flex flex-col items-center justify-center py-12 px-4 bg-black text-gray-50"
    >
      <h1 className="text-2xl md:text-3xl font-extrabold mb-10 md:mb-20 text-center text-gray-50">
        FLASHING SOFTWARE
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-7xl mx-auto">
        <div className="sqr bg-black p-4 rounded-lg shadow-md flex flex-col">
          <div className="relative aspect-square shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto">
            <Image
              fill
              alt="SQR400 Software"
              src="/backdark.jpg"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="mt-6 md:mt-8 text-gray-400">
            <p className="uppercase mb-2 text-xs text-[crimson] flex items-center">
              Contact us for enquiry
              <Link href="/" className="ml-2 text-[crimson]">
                <span className="text-xl">&#128172;</span>
              </Link>
            </p>
          </div>
          <h3 className="text-lg font-bold text-gray-50 mb-2">
            SQR<span className="text-[crimson]"> 400</span> VERSION 4.0
          </h3>
          <div className="space-y-1">
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              flash available
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              account flashing tool
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              legder to available balance
            </p>
          </div>
        </div>

        <div className="sqr bg-black p-4 rounded-lg shadow-md flex flex-col">
          <div className="relative aspect-square shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto">
            <Image
              fill
              alt="Swift SQR400 Flash Software"
              src="/backdark.jpg"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="mt-6 md:mt-8 text-gray-400">
            <p className="uppercase mb-2 text-xs text-[crimson] flex items-center">
              Contact us for enquiry
              <Link href="/" className="ml-2 text-[crimson]">
                <span className="text-xl">&#128172;</span>
              </Link>
            </p>
          </div>
          <h3 className="text-lg font-bold text-gray-50 mb-2">
            SWIFT SQR<span className="text-[crimson]"> 400</span> FLASH SOFTWARE
          </h3>
          <div className="space-y-1">
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              mt 103
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              mt 103 cash transfer
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              mt 103 gpi automatic
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              mt 103 gpi via ipip/ipid
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              mt 103 dlc
            </p>
            <p className="text-muted-foreground text-base md:text-lg capitalize">
              mt 199 transfer
            </p>
          </div>
        </div>

        <div className="sqr bg-black p-4 rounded-lg shadow-md flex flex-col">
          <div className="relative aspect-square shadow-lg rounded-lg overflow-hidden w-full max-w-md mx-auto">
            <Image
              fill
              alt="Bitcoin Flashing Software"
              src="/backdark.jpg"
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
          <div className="mt-6 md:mt-8 text-gray-400">
            <p className="uppercase mb-2 text-xs text-[crimson] flex items-center">
              Contact us for enquiry
              <Link href="/" className="ml-2 text-[crimson]">
                <span className="text-xl">&#128172;</span>
              </Link>
            </p>
          </div>
          <h3 className="text-lg font-bold text-gray-50 mb-2">
            BITCOIN FLASHING SOFTWARE
          </h3>
        </div>
      </div>
    </div>
  );
};

export default FlashingSoftware;
