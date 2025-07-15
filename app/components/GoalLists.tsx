import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FlatList, StyleSheet, View, Text } from "react-native";

type GoalListProps = {
  type: "Daily" | "Weekly" | "Milestone";
  refreshTrigger?: number;
};

type Goal = {
  id: string;
  name: string;
  completed: boolean;
};

export default function GoalLists({ type, refreshTrigger }: GoalListProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const hasFetched = useRef(false);

  useEffect(() => {
    const fetchGoals = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("Error fetching user: ", userError);
      }

      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("userId", user?.id)
        .eq("type", type)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error pulling dataaaaa:", error);
      } else {
        setGoals(data);
      }
    };
    fetchGoals();
  }, [refreshTrigger]);

  if (goals.length === 0) {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>
          Your {type} goals will appear here
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={goals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    ></FlatList>
  );
}
const styles = StyleSheet.create({
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
  messageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  messageText: {
    color: "white",
    fontSize: 14,
  },
});
