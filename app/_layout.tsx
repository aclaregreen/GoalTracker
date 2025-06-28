import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      {/* Stack renders header and screens */}
      <Stack
        screenOptions={{
          //header styling
          headerShown: true,
          headerStyle: { backgroundColor: "#4E4D4D" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // remove default back button currently for all screens may need to change later
          headerBackVisible: false,
          //no transitions, again may need to change
          animation: "none",
        }}
      />

      {/* Footer/navbar */}
      <SafeAreaView edges={["bottom"]} style={styles.safeFooterArea}>
        <View style={styles.navbar}>
          <TouchableOpacity
            style={styles.icon}
            onPress={() => router.push("/Home")}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => router.push("/Goals")}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => router.push("/Metrics")}
          />
          <TouchableOpacity
            style={styles.icon}
            onPress={() => router.push("/Profile")}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#383838",
  },
  //added to have matching colour below safearea
  safeFooterArea: {
    backgroundColor: "#4E4D4D",
  },
  navbar: {
    height: 80,
    width: "100%",
    backgroundColor: "#4E4D4D",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icon: {
    width: "12.5%",
    aspectRatio: 1,
    backgroundColor: "#00FF1A",
  },
});
