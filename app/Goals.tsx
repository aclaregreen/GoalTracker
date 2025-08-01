import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import GoalLists from "./components/GoalLists";
import AddGoal from "./components/AddGoal";
import { supabase } from "@/lib/supabase";
import { Route } from "react-native-tab-view";

import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

export default function Goals() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [goalName, setGoalName] = useState("");
  const [goalType, setGoalType] = useState("");
  const [goalFrequency, setGoalFrequency] = useState("1");
  const [goalDescription, setGoalDescription] = useState("");

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{ marginRight: 15 }}
        >
          <Text style={{ color: "#00ff1a", fontWeight: "bold", fontSize: 16 }}>
            + Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case "daily":
        return <GoalLists type="Daily" refreshTrigger={refreshTrigger} />;
      case "weekly":
        return <GoalLists type="Weekly" refreshTrigger={refreshTrigger} />;
      case "milestones":
        return <GoalLists type="Milestone" refreshTrigger={refreshTrigger} />;
      default:
        return null;
    }
  };

  const [routes] = useState([
    { key: "daily", title: "Daily" },
    { key: "weekly", title: "Weekly" },
    { key: "milestones", title: "Milestones" },
  ]);

  const addGoal = async () => {
    if (goalName == "" || goalType == "") {
      return;
    }

    const { data, error } = await supabase.from("goals").insert([
      {
        name: goalName,
        type: goalType,
        frequency: goalFrequency,
        description: goalDescription,
      },
    ]);
    if (error) {
      console.error("Error adding new goal: ", error);
    } else {
      setRefreshTrigger((prev) => prev + 1);
      setGoalName("");
      setGoalType("");
      setGoalFrequency("1");
      setGoalDescription("");
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "#ffffff" }}
            style={{ backgroundColor: "#333333" }}
          />
        )}
        style={{ flex: 1 }}
      ></TabView>

      <AddGoal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false),
            setGoalName(""),
            setGoalType(""),
            setGoalFrequency("1");
          setGoalDescription("");
        }}
        goalName={goalName}
        setGoalName={setGoalName}
        goalType={goalType}
        setGoalType={setGoalType}
        goalFrequency={goalFrequency}
        setGoalFrequency={setGoalFrequency}
        goalDescription={goalDescription}
        setGoalDescription={setGoalDescription}
        onSubmit={addGoal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  itemContainer: {
    backgroundColor: "#555",
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "5%",
    borderRadius: 20,
  },
  itemText: {
    color: "white",
    padding: "12.5%",
  },
  listContainer: {
    backgroundColor: "#222",
    paddingBottom: "5%",
  },
});
