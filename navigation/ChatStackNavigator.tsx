import { FontAwesome } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Pressable } from 'react-native';
import ChatContextProvider from '../context/ChatContext';
import ChatRoomScreen from '../screens/Chat/ChatRoomScreen';

import ChatsScreen from '../screens/Chat/ChatsScreen';
import UsersScreen from '../screens/UsersScreen';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <ChatContextProvider>
            <Stack.Navigator>
                <Stack.Screen name="Chats" component={ChatsScreen} options={({ navigation }) => ({
                    headerRight: () => (
                        <Pressable
                            onPress={() => navigation.navigate('Users')}
                            style={({ pressed }) => ({
                                opacity: pressed ? 1 : 1,
                            })}>
                            <FontAwesome
                                name="users"
                                size={25}
                                color={'dimgray'}
                                style={{ marginRight: 15 }}
                            />
                        </Pressable>
                    ),
                })} />
                <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
                <Stack.Group screenOptions={{ presentation: 'modal' }}>
                    <Stack.Screen name="Users" component={UsersScreen} />
                </Stack.Group>
            </Stack.Navigator>
        </ChatContextProvider>
    );
};
