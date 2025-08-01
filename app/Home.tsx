import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ProgressBar from 'react-native-progress-bar-horizontal';

export default function Home() {
  const goalsCompleted = 13;
  const goalsTotal = 16;
  const progressPercentage = goalsCompleted / goalsTotal;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: "white", marginBottom: 8 }}>
          Weekly Goals: {goalsCompleted}/{goalsTotal}
        </Text>
        <ProgressBar
          progress={progressPercentage}
          borderWidth={1}
          fillColor="#00ff1a"
          unfilledColor="#085200ff"
          height={20}
          borderColor="#00ff1a"
          duration={100}
          width={350}
          borderRadius={15}
        />
      </View>

      {/* Cards fill the rest of the space */}
      <View style={styles.cards}>
        <View style={[styles.card, { flex: 1, marginTop: 20 }]} />
        <View style={[styles.card, { flex: 1 }]} />
        <View style={[styles.card, { flex: 0.8 }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  content: {
    paddingTop: 20,
    paddingBottom: 10,
    alignItems: "center",
  },
  cards: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#3c3c3c", // gray like your Figma
    borderRadius: 12,
    marginBottom: 20,
  },
});
