import { Alert, Pressable, StyleSheet, Text } from 'react-native';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import events from "../assets/data/events.json"
import React from 'react';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {

  const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
    const fontSize = isFirst ? 16 : 14;
    const color = isFirst ? "black" : "#43515c";

    return (
      <Pressable
        style={[styles.item, { height: reservation.height }]}
        onPress={() => navigation.navigate("Modal", { id: reservation.id })}
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
      </Pressable>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>Пустая дата</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Agenda
        renderEmptyDate={renderEmptyDate}
        items={events}
        renderItem={renderItem}
        selected="2022-11-27"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
