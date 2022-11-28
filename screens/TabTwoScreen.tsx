import { StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import CustomButton from "../components/CustomButton";
import { useSignOut, useUserData } from "@nhost/react";

export default function TabTwoScreen() {
  const { signOut } = useSignOut();
  const user = useUserData();

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{user?.displayName}</Text>
      <View style={{ marginTop: "auto", backgroundColor: 'white' }}>
        <CustomButton
          onPress={signOut}
          text="Sign out"
          type="TERTIARY"
          fgColor="crimson"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: 'white'
  },
  avatar: {
    width: 100,
    aspectRatio: 1,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    fontSize: 22,
    marginVertical: 15,
    color: "dimgray",
  },
});