
"use client"
import React from 'react'
import { Toaster } from '@/components/ui/toaster';
import ChatNotification from './index.html/MessageNotification';
import { MessageContextProvider } from './context/MessageContext';


const ToastUi = () => {
    return (
      <MessageContextProvider>
        <Toaster />
        <ChatNotification />
      </MessageContextProvider>
    );
}

export default ToastUi