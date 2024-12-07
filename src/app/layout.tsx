"use client";
import "./globals.css";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import ToastUi from "./ToastUi";
import { ChatContextProvider } from "./context/ChatContext";
import { MessageContextProvider } from "./context/MessageContext";
import { OpenContextProvider } from "./context/OpenContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <ChatContextProvider>
        <MessageContextProvider>
          <OpenContextProvider>
            <body className={`bg-black antialiased`}>
              <Header />
              <ToastUi />
              {children}
              <Footer />
            </body>
          </OpenContextProvider>
        </MessageContextProvider>
      </ChatContextProvider>
    </html>
  );
}
