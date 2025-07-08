import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Metrics() {
  return (
    <View style={styles.container}>
      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
