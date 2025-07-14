import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import GoalLists from "./components/GoalLists";

const Daily = () => {
  return <GoalLists type="Daily" />;
};
const Weekly = () => {
  return <GoalLists type="Weekly" />;
};
const Milestones = () => {
  return <GoalLists type="Milestone" />;
};

const renderScene = SceneMap({
  daily: Daily,
  weekly: Weekly,
  milestones: Milestones,
});

export default function Goals() {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "daily", title: "Daily" },
    { key: "weekly", title: "Weekly" },
    { key: "milestones", title: "Milestones" },
  ]);

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
      <View style={styles.test}>
        <TouchableOpacity style={styles.addButton}>
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
    //height: "100%",
    // marginHorizontal: "5%",
    backgroundColor: "#2222",
    paddingBottom: "5%",
  },
  test: {
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
