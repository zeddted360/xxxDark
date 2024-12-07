import React from "react";

const ProgressBar = ({ label, value }: { label: string; value: number }) => {
  return (
    <div id="scale-sale" className="mb-4">
      <div className="flex justify-between text-sm font-bold text-gray-200">
        <span>{label.toUpperCase()}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-4">
        <div
          className="h-4 rounded-full bg-[crimson]"
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

const SalesScale = () => {
  return (
    <>
      <div className="sales mx-auto text-4xl text-center font-extrabold uppercase mb-10 p-8 text-gray-50">Sales Scale</div>
      <div className="bg-black flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6 mb-10">
          <ProgressBar label="Logs" value={60} />
          <ProgressBar label="CC/Track/Dump" value={85} />
          <ProgressBar label="Flashing Software" value={50} />
          <ProgressBar label="Social Media Hack" value={98} />
        </div>
      </div>
    </>
  );
};

export default SalesScale;
