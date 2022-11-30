import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatRoomScreen from '../screens/Chat/ChatRoomScreen';

import ChatsScreen from '../screens/Chat/ChatsScreen';

const Stack = createNativeStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Chats" component={ChatsScreen} />
            <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </Stack.Navigator>
    );
};