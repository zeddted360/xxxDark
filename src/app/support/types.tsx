
// mine

export interface IMessage {
  _id?: string;
  content: string;
  sender: string;
  receiver: string;
  conversationId: string;
  timestamp: Date;
  fileUrl?: string;
}


export interface IUser {
  _id?: string;
  username: string;
  socketId: string;
  onlineStatus: boolean;
  isAdmin: boolean;
}

export interface IConversation {
  _id?: string;
  participants: string;
  lastMessage: Date;
}
