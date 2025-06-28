import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function profile() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Green Rectangle */}
      <View style={styles.navbar} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    backgroundColor: "#383838",
  },
  navbar: {
    width: "100%",
    height: "12%",
    backgroundColor: "#4E4D4D",
    position: "absolute",
    bottom: 0,
  },
});
