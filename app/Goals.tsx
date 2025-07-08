import React, { useState } from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  FlatList,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const Daily = () => {
  return (
    <FlatList
      data={[
        { id: "1", name: "Drink Water" },
        { id: "2", name: "Stretch" },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    ></FlatList>
  );
};
const Weekly = () => {
  return (
    <FlatList
      data={[
        { id: "1", name: "Do something" },
        { id: "2", name: "idk man" },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    ></FlatList>
  );
};
const Milestones = () => {
  return (
    <FlatList
      data={[
        { id: "1", name: "Test" },
        { id: "2", name: "this" },
        { id: "3", name: "thing" },
        { id: "4", name: "thing" },
        { id: "5", name: "thing" },
        { id: "6", name: "thing" },
        { id: "7", name: "thing" },
        { id: "8", name: "thing" },
        { id: "9", name: "thing" },
        { id: "10", name: "thing" },
        { id: "11", name: "thing" },
      ]}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    ></FlatList>
  );
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
      <View style={styles.test}></View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222222",
  },
  test: {
    backgroundColor: "blue",
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
});
