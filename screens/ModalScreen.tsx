import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, Image, ActivityIndicator, Alert } from 'react-native';
import event from "../assets/data/event.json"
import { View } from '../components/Themed';
import { AntDesign } from "@expo/vector-icons";
import CustomButton from '../components/CustomButton';
import users from "../assets/data/users.json";
import { gql, useQuery, useMutation } from '@apollo/client';
import { useUserId } from "@nhost/react";
import { useChatContext } from '../context/ChatContext';

const GetEvent = gql`
  query GetEvent($id: uuid!) {
    Event_by_pk(id: $id) {
      id
      name
      date
      EventAttendee {
        user {
          id
          displayName
          avatarUrl
        }
      }
    }
  }
`;

const JoinEvent = gql`
  mutation InsertEventAttendee($eventId: uuid!, $userId: uuid!) {
    insert_EventAttendee(objects: [{ eventId: $eventId, userId: $userId }]) {
      returning {
        id
        userId
        eventId
        Event {
          id
          EventAttendee {
            id
          }
        }
      }
    }
  }
`;

export default function ModalScreen({ route }) {
  const id = route?.params?.id;
  const userId = useUserId();
  console.log("Rendering event ", id);

  const { data, loading, error } = useQuery(GetEvent, { variables: { id } });
  const event = data?.Event_by_pk;

  const [doJoinEvent] = useMutation(JoinEvent);

  const { joinEventChatRoom } = useChatContext();

  const onJoin = async () => {
    try {
      await doJoinEvent({ variables: { userId, eventId: id } });
    } catch (e) {
      Alert.alert("Failed to join the event!", (e as Error).message);
    }
  };

  const displayedUsers = (event?.EventAttendee || [])
    .slice(0, 5)
    .map((attendee) => attendee.user);

  const joined = event?.EventAttendee?.some((att) => att.user.id === userId);

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Couldn't find the event</Text>
        <Text>{error.message}</Text>
      </View>
    );
  }

  if (loading) {
    return <ActivityIndicator />;
  }
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
          {displayedUsers?.map((user, i) => (
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
                transform: [{ translateX: -15 * displayedUsers.length }],
              },
            ]}
          >
            <Text>+{event?.EventAttendee.length}</Text>
          </View>
        </View>

        {
          !joined ? <CustomButton text="Join the event" onPress={onJoin} /> : (
            <CustomButton
              text="Join the conversation"
              type="SECONDARY"
              onPress={() => joinEventChatRoom(event)}
            />
          )
        }
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
