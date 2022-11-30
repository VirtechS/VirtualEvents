import React, { createContext, useContext } from "react";

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const value = { username: "test context" };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);

export default ChatContextProvider;