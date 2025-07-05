//need to improve design for this page, change colours, make smaller
//images (?)
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

export default function Start() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.half}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <Text style={styles.appName}>NexStep</Text>
      </View>
      <View style={styles.half}>
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => router.push("/CreateAccount")}
        >
          <Text style={styles.signUpButtonText}>Join for Free</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/Login")}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  half: {
    height: "50%",

    //backgroundColor: "#aaaaaa",
    alignItems: "center",
  },
  logo: {
    height: "60%",
    width: "60%",
    marginTop: "10%",
  },
  appName: {
    fontSize: 72,
    color: "white",
    fontFamily: "Sora-Bold",
  },
  signUpButton: {
    marginTop: "40%",
    width: "80%",
    height: "15%",
    borderRadius: 20,
    backgroundColor: "#00ff1a",
    justifyContent: "center",
    alignItems: "center",
  },
  loginButton: {
    marginTop: "10%",
    width: "80%",
    height: "15%",
    borderRadius: 20,
    borderColor: "#00ff1a",
    borderWidth: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpButtonText: {
    fontSize: 25,
    fontWeight: "bold",
  },
  loginButtonText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#00ff1a",
  },
});
