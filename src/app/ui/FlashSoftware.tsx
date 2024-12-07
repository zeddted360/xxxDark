import Image from "next/image";
import Link from "next/link";
import React from "react";

const FlashingSoftware: React.FC = () => {
  return (
    <div id="flashing-software" className="flex flex-col items-center justify-center  bg-black text-gray-50">
      <h1 className="text-3xl font-extrabold mb-20 text-gray-50">
        FLASHING SOFTWARE
      </h1>
      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="sqr bg-black p-4 rounded-lg shadow-md">
          <div className="relative aspect-square shadow-lg rounded-lg h-80 w-[30rem] overflow-hidden imageContainer">
            <Image
              fill
              alt="im"
              src={"/backdark.jpg"}
              className="object-cover"
            />
          </div>
          <div className="mt-8 text-gray-400">
            <p className="uppercase mb-2 text-xs text-[crimson]">
              Contact us for enquiry{""}
              <Link href={"/"} className="ml-2  text-[crimson]">
                {" "}
                &#128172;
              </Link>
            </p>
          </div>
          <h3 className="text-lg font-bold text-gray-50 mb-2">
            SQR<span className="text-[crimson]">400</span> VERSION 4.0
          </h3>
          <p className="text-muted-foreground text-lg capitalize">
            flash available
          </p>
          <p className="text-muted-foreground text-lg capitalize">
            account flashing tool
          </p>
          <p className="text-muted-foreground text-lg capitalize">
            legder to available balance
          </p>
        </div>
        {/*  */}
        <div className="sqr bg-black p-4 rounded-lg shadow-md">
          <div className="relative aspect-square shadow-lg rounded-lg h-80 w-[30rem] overflow-hidden imageContainer">
            <Image
              fill
              alt="im"
              src={"/backdark.jpg"}
              className="object-cover"
            />
          </div>
          <div className="mt-8 text-gray-400">
            <p className="uppercase mb-2 text-xs text-[crimson]">
              Contact us for enquiry{""}
              <Link href={"/"} className="ml-2  text-[crimson]">
                {" "}
                &#128172;
              </Link>
            </p>
          </div>
          <h3 className="text-lg font-bold text-gray-50 mb-2">
            SWIFT SQR<span className="text-[crimson]">400</span> FLASH SOFTWARE
          </h3>
          <p className="text-muted-foreground text-lg capitalize">mt 103</p>
          <p className="text-muted-foreground text-lg capitalize">
            mt 103 cash transfer
          </p>
          <p className="text-muted-foreground text-lg capitalize">
            mt 103 gpi automatic
          </p>
          <p className="text-muted-foreground text-lg capitalize">
            mt 103 gpi via ipip/ipid
          </p>
          <p className="text-muted-foreground text-lg capitalize">mt 103 dlc</p>
          <p className="text-muted-foreground text-lg capitalize">
            mt 199 transfer
          </p>
        </div>
        {/*  */}
        <div className="sqr bg-black p-4 rounded-lg shadow-md">
          <div className="relative aspect-square shadow-lg rounded-lg h-80 w-[30rem] overflow-hidden imageContainer">
            <Image
              fill
              alt="im"
              src={"/backdark.jpg"}
              className="object-cover"
            />
          </div>
          <div className="mt-8 text-gray-400">
            <p className="uppercase mb-2 text-xs text-[crimson]">
              Contact us for enquiry{""}
              <Link href={"/"} className="ml-2  text-[crimson]">
                {" "}
                &#128172;
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
