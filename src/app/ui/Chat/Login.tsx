import React, { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useChatContext } from "@/app/hooks/useChatContext";

const LoginUI = ({
  user,
  setUser,
}: {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}) => {
  const [username, setUsername] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { setData } = useChatContext();

  const postUserToDB = async (username: string) => {
    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });
      if (!response.ok) console.log("something went wrong");
       await response.json();
      setData({ user, sender: username, receiver: "" });
    } catch (error) {
      console.error(error instanceof Error && error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      localStorage.setItem("user", username);
      await postUserToDB(username);
      setShowSuccess(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowSuccess(false);
      setUser(username);
    }
  };

  return (
    !user && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60]">
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Welcome to Dumpbonds
            </CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    Anonymous
                  </label>
                  <Input
                    id="username"
                    placeholder="Enter a random number or letters"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full"
                    required
                  />
                </div>

                {showSuccess && (
                  <Alert className="bg-green-100 border-green-500">
                    <AlertTitle className="text-green-800">Success!</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Room joined successfully
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={!username.trim()}
              >
                Continue to Chat
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    )
  );
};

export default LoginUI;
