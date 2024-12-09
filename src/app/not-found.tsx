import Link from "next/link";
import React from "react";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "404",
  description: "page not found",
};
const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 text-gray-950">
      <div className="text-center">
        <h1 className="text-9xl font-extrabold text-gray-900 drop-shadow-md">
          404
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-700">
          Oops! Page not found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            className="bg-gray-900 text-gray-200 rounded-full p-4 hover:bg-gray-500 hover:text-gray-50"
            href={'/'}
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
