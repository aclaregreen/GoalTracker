import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {/* Stack renders header and screens */}
      <Stack
        screenOptions={{
          //header styling
          headerShown: true,
          headerStyle: { backgroundColor: "#444444" },
          headerTintColor: "#fff",
          headerTitleAlign: "center",
          // remove default back button currently for all screens may need to change later
          headerBackVisible: false,
          //no transitions, again may need to change
          animation: "none",
        }}
      >
        <Stack.Screen name="Start" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="CreateAccount" options={{ headerShown: false }} />
      </Stack>

      {pathname !== "/Start" &&
        pathname !== "/Login" &&
        pathname !== "/CreateAccount" && (
          // Footer/navbar
          <SafeAreaView edges={["bottom"]} style={styles.safeFooterArea}>
            <View style={styles.navbar}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => router.push("/Home")}
              >
                <Image
                  // source={require("../assets/images/home.png")}
                  source={
                    pathname === "/Home"
                      ? require("../assets/images/home.png")
                      : require("../assets/images/home-white.png")
                  }
                  style={styles.navIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => router.push("/Goals")}
              >
                <Image
                  source={
                    pathname === "/Goals"
                      ? require("../assets/images/target.png")
                      : require("../assets/images/target-white.png")
                  }
                  style={styles.navIcon}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => router.push("/Metrics")}
              >
                <Image
                  source={
                    pathname === "/Metrics"
                      ? require("../assets/images/graph.png")
                      : require("../assets/images/graph-white.png")
                  }
                  style={styles.navIcon}
                ></Image>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => router.push("/Profile")}
              >
                <Image
                  source={
                    pathname === "/Profile"
                      ? require("../assets/images/profile.png")
                      : require("../assets/images/profile-white.png")
                  }
                  style={styles.navIcon}
                ></Image>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        )}
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
    backgroundColor: "#444444",
  },
  navbar: {
    height: 55,
    width: "100%",
    backgroundColor: "#444444",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  icon: {
    width: "20%",
    aspectRatio: 1.5,
    // backgroundColor: "#555555",
    justifyContent: "center",
    alignItems: "center",
  },
  //make height 1.5 width for aspect ratio
  navIcon: {
    width: "30%",
    height: "45%",
  },
});
