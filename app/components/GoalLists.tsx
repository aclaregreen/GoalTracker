import React, { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

type GoalListProps = {
  type: "Daily" | "Weekly" | "Milestone";
  refreshTrigger?: number;
};

type Goal = {
  id: string;
  name: string;
  completed: boolean;
  frequency: number;
  description: string;
  numCompleted: number;
};

export default function GoalLists({ type, refreshTrigger }: GoalListProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 90;
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
        <View style={styles.goalCard}>
          <View style={styles.cardTop}>
            <View>
              <Text style={styles.goalTitle}>{item.name}</Text>
              <Text style={styles.frequencyText}>
                {" "}
                {item.frequency}x{" "}
                {type === "Daily"
                  ? "today"
                  : type === "Weekly"
                  ? "this week"
                  : ""}
              </Text>
            </View>

            <TouchableOpacity style={styles.moreButton}>
              <Text style={{ color: "white", fontSize: 18 }}>•••</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.cardLeft}>
              <AnimatedCircularProgress
                size={80}
                width={8}
                fill={(item.numCompleted / item.frequency) * 100}
                tintColor="#00bfff"
                backgroundColor="#444"
                lineCap="round"
                rotation={0}
              >
                {(fill: number) => (
                  <Text style={styles.progressText}>{Math.round(fill)}%</Text>
                )}
              </AnimatedCircularProgress>
            </View>
            <View style={styles.cardMiddle}>
              <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
                <Text style={styles.goalDescription}>
                  {isExpanded || item.description.length <= MAX_CHARS
                    ? item.description
                    : item.description.slice(0, MAX_CHARS) + "..."}
                  {item.description.length > MAX_CHARS && (
                    <Text style={styles.readMore}>
                      {isExpanded ? " Show less" : " more"}
                    </Text>
                  )}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.cardRight}>
              <TouchableOpacity
                style={styles.completeButton}
              ></TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      contentContainerStyle={styles.listContainer}
    ></FlatList>
  );
}
const styles = StyleSheet.create({
  listContainer: {
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
  goalCard: {
    backgroundColor: "#2a2a2a",
    borderRadius: 15,
    padding: 16,
    marginHorizontal: "5%",
    marginTop: "5%",
    borderWidth: 2,
    borderColor: "#00ff91",
    shadowColor: "#00ff91",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  content: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLeft: {
    width: "25%",
  },
  cardMiddle: {
    width: "62.5%",
    paddingHorizontal: 10,
  },
  cardRight: {
    width: "12.5%",
    //justifyContent: "space-between",
  },
  moreButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 16,
    width: "10%",
    aspectRatio: 1,
  },
  completeButton: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#444444",
    width: "100%",
    aspectRatio: 1,
  },
  progressText: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  frequencyText: {
    color: "#00ff1a",
    fontWeight: "bold",
  },
  goalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  goalDescription: {
    fontSize: 14,
    color: "#cccccc",
    marginTop: 4,
  },
  readMore: {
    color: "#00FF1A", // accent color for interactivity
    fontWeight: "bold",
  },
});
