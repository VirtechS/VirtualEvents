import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, Image } from 'react-native';
import event from "../assets/data/event.json"
import { View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import CustomButton from '../components/CustomButton';
import users from "../assets/data/users.json";
export default function ModalScreen({ route }) {
  const id = route?.params?.id;
  console.log("Rendering event ", id);
  const onJoin = () => { }

  const displaydUsers = users.slice(0, 5)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{event.name}</Text>
      <Text style={styles.time}>
        <AntDesign name="calendar" size={24} color={"black"} />
        {"  | "}
        {new Date(event.date).toDateString()}
      </Text>


      <View style={styles.footer}>
        <Text style={styles.subtitle}>Участники</Text>
        <View style={styles.users}>
          {displaydUsers?.map((user, i) => (
            <Image
              source={{ uri: user.avatarUrl }}
              style={[
                styles.userAvatar,
                { transform: [{ translateX: -15 * i }] },
              ]}
              key={user.id}
            />
          ))}
          <View
            style={[
              styles.userAvatar,
              {
                transform: [{ translateX: -15 * displaydUsers.length }],
              },
            ]}
          >
            <Text>+{displaydUsers.length}</Text>
          </View>
        </View>

        <CustomButton text="Присоединяйтесь к мероприятию" onPress={onJoin} />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
    paddingBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  time: {
    fontSize: 20,
  },
  footer: {
    backgroundColor: 'white',
    marginTop: "auto",
  },
  users: {
    backgroundColor: 'white',
    flexDirection: "row",
    marginVertical: 10,
  },
  userAvatar: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 30,
    margin: 2,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "gainsboro",
  },
});
