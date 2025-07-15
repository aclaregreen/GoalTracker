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

export default function Goals() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [goalName, setGoalName] = useState("");
  const [goalType, setGoalType] = useState("");

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

    const { data, error } = await supabase
      .from("goals")
      .insert([{ name: goalName, type: goalType }]);
    if (error) {
      console.error("Error adding new goal: ", error);
    } else {
      setRefreshTrigger((prev) => prev + 1);
      setGoalName("");
      setGoalType("");
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
        onClose={() => setModalVisible(false)}
        goalName={goalName}
        setGoalName={setGoalName}
        goalType={goalType}
        setGoalType={setGoalType}
        onSubmit={addGoal}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
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
    backgroundColor: "#2222",
    paddingBottom: "5%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: "5%",
    right: "5%",
  },
  addButton: {
    width: 75,
    aspectRatio: 1,
    backgroundColor: "#00ff1a",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  addText: {
    color: "black",
    fontSize: 60,
    lineHeight: 65,
  },
});
