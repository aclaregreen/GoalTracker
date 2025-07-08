import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
      return;
    }

    router.replace("/Start");
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.content}></View>
        <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
          <Text style={styles.buttonText}>Log out</Text>
        </TouchableOpacity>
        <View></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  content: {
    backgroundColor: "#333",
    padding: "80%",
  },
  button: {
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "10%",
  },
  buttonText: {
    color: "white",
  },
});
