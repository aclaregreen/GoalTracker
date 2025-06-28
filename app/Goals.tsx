import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";

export default function goals() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Green Rectangle */}
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
});
