import type { Metadata } from "next";

import "./globals.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import ToastUi from "./ToastUi";
import {
  ChatContextProvider,
  NewMessageContextProvider,
  OpenContextProvider,
  UserContextProvider,
  UsersContextProvider,
} from "./context/store";

export const metadata: Metadata = {
  title: "Dark Bonds | Home",
  description: "Tested and Trusted",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en_us">
      <body className={`bg-black antialiased`}>
        <UsersContextProvider>
          <UserContextProvider>
            <ChatContextProvider>
              <NewMessageContextProvider>
                <OpenContextProvider>
                  <Header />
                  <ToastUi />
                  {children}
                  <Footer />
                </OpenContextProvider>
              </NewMessageContextProvider>
            </ChatContextProvider>
          </UserContextProvider>
        </UsersContextProvider>
      </body>
    </html>
  );
}
