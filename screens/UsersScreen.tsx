import users from '../assets/data/users.json';
import { FlatList } from 'react-native';
import UserListItem from '../components/UserListItem';

const UsersScreen = () => {
    return (
        <FlatList
            data={users}
            renderItem={({ item }) => <UserListItem user={item} />}
        />
    );
};

export default UsersScreen;