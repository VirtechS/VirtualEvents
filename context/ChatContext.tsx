import { useUserData } from "@nhost/react";
import React, { createContext, useContext, useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

export const ChatContext = createContext({});

const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [chatClient, setChatClient] = useState<StreamChat>();

    const user = useUserData();

    useEffect(() => {
        const initChat = async () => {
            if (!user) {
                return;
            }

            const client = StreamChat.getInstance("hd9seqjqd4yn");

            await client.connectUser(
                {
                    id: user.id,
                    name: user.displayName,
                    image: user.avatarUrl,
                },
                client.devToken(user.id)
            );

            setChatClient(client);

            const globalChannel = client.channel("livestream", "global", {
                name: "VirtechLive.dev",
            });

            await globalChannel.watch();
        };

        initChat();
    }, []);

    useEffect(() => {
        return () => {
            if (chatClient) {
                chatClient.disconnectUser();
            }
        };
    }, []);

    const value = { username: "test context" };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export const useChatContext = () => useContext(ChatContext);
export default ChatContextProvider;