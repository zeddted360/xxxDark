import { IUser } from "./types";

interface ChatHeaderProps {
  selectedUser: IUser | null;
  typingUser: string | null;
}

export const ChatHeader = ({ selectedUser, typingUser }: ChatHeaderProps) => {
  return (
    <div className="bg-red-600 p-4 text-white flex items-center">
      <h1 className="text-xl text-gray-50 font-bold">Dump Bonds</h1>
      {selectedUser && (
        <div className="ml-4 flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2" />
          <span>
            {typingUser ? (
              <span className="typing-indicator">
                {typingUser} is typing
                <span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </span>
            ) : (
              selectedUser.username
            )}
          </span>
        </div>
      )}
    </div>
  );
};
