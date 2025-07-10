import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={{ color: "white" }}>Hey cutie</Text>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
