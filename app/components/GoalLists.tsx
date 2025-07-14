import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FlatList, StyleSheet, View, Text } from "react-native";

type GoalType = {
  type: "Daily" | "Weekly" | "Milestone";
};

type Goal = {
  id: string;
  name: string;
  completed: boolean;
};

export default function GoalLists({ type }: GoalType) {
  const [goals, setGoals] = useState<Goal[]>([]);

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
  }, [type]);

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
});
