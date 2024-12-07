import { useEffect, useState } from "react";
import { IMessage } from "../support/types";

export const useFetchMessages = (url: string) => {
  const [chatMessages, setChatMessage] = useState<IMessage[]>([]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error("Error: something went wrong");
        } else {
          const data: { message: IMessage[] } = await res.json();
          setChatMessage(data.message);
        }
      } catch (error) {
        console.error(error instanceof Error && error.message);
      }
    };

    getMessages();
  }, [url]);

  return { chatMessages };
};
