import React from "react";

export default function Rating() {
  return (
    <div className="relative z-10 md:-mb-20 container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col justify-center items-center bg-gray-900 p-8 rounded-md shadow-lg">
          <h1 className="text-[crimson] text-4xl font-extrabold">50</h1>
          <span className="text-muted-foreground block">+</span>
          <p className="text-lg text-gray-300">Products</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-900 p-8 rounded-md shadow-lg">
          <h1 className="text-[crimson] text-4xl font-extrabold">1,000</h1>
          <span className="text-muted-foreground block">+</span>
          <p className="text-lg text-gray-300">Complete Purchases</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-900 p-8 rounded-md shadow-lg">
          <h1 className="text-[crimson] text-4xl font-extrabold">500</h1>
          <span className="text-muted-foreground block">+</span>
          <p className="text-lg text-gray-300">Happy Customers</p>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-900 p-8 rounded-md shadow-lg">
          <h1 className="text-[crimson] text-4xl font-extrabold">50,000</h1>
          <span className="text-muted-foreground block">+</span>
          <p className="text-lg text-gray-300">Revenue</p>
        </div>
      </div>
    </div>
  );
}
