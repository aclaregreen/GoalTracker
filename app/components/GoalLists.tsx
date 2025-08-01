import { supabase } from "@/lib/supabase";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import AddGoal from "./AddGoal";

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
  type: string;
};

export default function GoalLists({ type, refreshTrigger }: GoalListProps) {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_CHARS = 90;
  const hasFetched = useRef(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editGoalName, setEditGoalName] = useState("");
  const [editGoalType, setEditGoalType] = useState("");
  const [editGoalFrequency, setEditGoalFrequency] = useState("");
  const [editGoalDescription, setEditGoalDescription] = useState("");

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

  const handleUndo = async (item: Goal) => {
    let newCount = item.numCompleted - 1;
    if (newCount < 0) {
      newCount = 0;
    }
    let newComplete = item.frequency <= newCount;
    const { error } = await supabase
      .from("goals")
      .update({ numCompleted: newCount, completed: newComplete })
      .eq("id", item.id);
    if (error) {
      console.error("Error undoing completion", error);
    }
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === item.id
          ? { ...goal, numCompleted: newCount, completed: newComplete }
          : goal
      )
    );
    setOpenMenuId(null);
  };

  const handleEdit = (item: Goal) => {
    setEditingGoal(item);
    setEditGoalName(item.name);
    setEditGoalType(item.type);
    setEditGoalFrequency(item.frequency.toString());
    setEditGoalDescription(item.description);
    setEditModalVisible(true);
    setOpenMenuId(null);
  };

  const handleUpdateGoal = async () => {
    if (!editingGoal) return;

    const newFrequency = parseInt(editGoalFrequency);
    const currentCompleted = editingGoal.numCompleted;

    // Recalculate completion status based on new frequency
    const newCompleted = currentCompleted >= newFrequency;

    const { error } = await supabase
      .from("goals")
      .update({
        name: editGoalName,
        type: editGoalType,
        frequency: newFrequency,
        description: editGoalDescription,
        completed: newCompleted,
      })
      .eq("id", editingGoal.id);

    if (error) {
      console.error("Error updating goal", error);
      return;
    }

    // Update locally
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === editingGoal.id
          ? {
              ...goal,
              name: editGoalName,
              type: editGoalType,
              frequency: newFrequency,
              description: editGoalDescription,
              completed: newCompleted,
            }
          : goal
      )
    );

    // Reset form and close modal
    setEditModalVisible(false);
    setEditingGoal(null);
    setEditGoalName("");
    setEditGoalType("");
    setEditGoalFrequency("");
    setEditGoalDescription("");
  };

  const closeEditModal = () => {
    setEditModalVisible(false);
    setEditingGoal(null);
    setEditGoalName("");
    setEditGoalType("");
    setEditGoalFrequency("");
    setEditGoalDescription("");
  };

  const handleDelete = (item: Goal) => {
    Alert.alert("Delete Goal", "Are you sure you want to delete your goal?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          const { error } = await supabase
            .from("goals")
            .delete()
            .eq("id", item.id);
          console.log("Deleting goal with id:", item.id);
          if (error) {
            console.error("Error deleting goal", error);
          }
          setGoals((prevGoals) =>
            prevGoals.filter((goal) => goal.id !== item.id)
          );
          setOpenMenuId(null);
        },
      },
    ]);
  };

  const addCompletion = async (item: Goal) => {
    const newCount = item.numCompleted + 1;
    const { error } = await supabase
      .from("goals")
      .update({ numCompleted: newCount })
      .eq("id", item.id);
    if (newCount == item.frequency) {
      const { error } = await supabase
        .from("goals")
        .update({ completed: true })
        .eq("id", item.id);
      if (error) {
        console.error("Issue adding completion", error);
        return;
      }
      //update locally
      setGoals((prevGoals) =>
        prevGoals.map((goal) =>
          goal.id === item.id ? { ...goal, completed: true } : goal
        )
      );
    }

    if (error) {
      console.error("Issue adding completion", error);
      return;
    }
    //update locally
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === item.id ? { ...goal, numCompleted: newCount } : goal
      )
    );
  };

  const handleMenuPress = (item: Goal, event: any) => {
    // Get the position of the button to position the menu
    event.target.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        pageX: number,
        pageY: number
      ) => {
        setMenuPosition({ x: pageX, y: pageY + height });
      }
    );
    setOpenMenuId(openMenuId === item.id ? null : item.id);
  };

  const testReset = async () => {
    const { error } = await supabase.rpc("archive_and_reset_daily_goals");
    if (error) {
      console.error("Error resetting", error);
    }
  };

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
    <>
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.goalCard}>
            <View style={styles.cardTop}>
              <View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.goalTitle}>{item.name}</Text>
                  {item.completed ? (
                    <View style={styles.completion}>
                      <Text>✓</Text>
                    </View>
                  ) : (
                    ""
                  )}
                </View>

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

              <TouchableOpacity
                style={styles.moreButton}
                onPress={(event) => handleMenuPress(item, event)}
              >
                <Text style={{ color: "white", fontSize: 18 }}>•••</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.content}>
              <View style={styles.cardLeft}>
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={testReset}
                ></TouchableOpacity>
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
                <Pressable
                  style={({ pressed }) => [
                    styles.completeButton,
                    pressed && { borderColor: "#00ff1a" },
                    //item.completed ? { borderColor: "#00ff1a" } : "",
                  ]}
                  onPress={() => addCompletion(item)}
                  //disabled={item.completed}
                >
                  {({ pressed }) => (
                    <Text
                      style={[
                        {
                          color: pressed ? "#00ff1a" : "#aaaaaa",
                          fontSize: 20,
                          lineHeight: 22,
                        },
                        //item.completed && { color: "#00ff1a" },
                      ]}
                    >
                      +
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for dropdown menu */}
      <Modal
        visible={openMenuId !== null}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setOpenMenuId(null)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setOpenMenuId(null)}
        >
          <View
            style={[
              styles.dropdownMenu,
              {
                position: "absolute",
                top: menuPosition.y,
                right: 20,
              },
            ]}
          >
            <Pressable
              onPress={() =>
                handleUndo(goals.find((g) => g.id === openMenuId)!)
              }
              style={({ pressed }) => [
                styles.dropdownItem,
                pressed && { backgroundColor: "#444" },
              ]}
            >
              <Text style={styles.dropdownItemText}>Undo Completion</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                handleEdit(goals.find((g) => g.id === openMenuId)!)
              }
              style={({ pressed }) => [
                styles.dropdownItem,
                pressed && { backgroundColor: "#444" },
              ]}
            >
              <Text style={styles.dropdownItemText}>Edit</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                handleDelete(goals.find((g) => g.id === openMenuId)!)
              }
              style={({ pressed }) => [
                styles.dropdownItem,
                pressed && { backgroundColor: "#444" },
              ]}
            >
              <Text style={[styles.dropdownItemText, { color: "#ff4d4d" }]}>
                Delete
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Edit Goal Modal */}
      <AddGoal
        visible={editModalVisible}
        onClose={closeEditModal}
        goalName={editGoalName}
        setGoalName={setEditGoalName}
        goalType={editGoalType}
        setGoalType={setEditGoalType}
        goalFrequency={editGoalFrequency}
        setGoalFrequency={setEditGoalFrequency}
        goalDescription={editGoalDescription}
        setGoalDescription={setEditGoalDescription}
        onSubmit={handleUpdateGoal}
        isEditing={true}
      />
    </>
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
  completion: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#00ff1a",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
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
  },
  moreButton: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
    width: "12%",
    aspectRatio: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  completeButton: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#aaaaaa",
    width: "100%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "#00FF1A",
    fontWeight: "bold",
  },
  dropdownMenu: {
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 120,
  },
  dropdownItem: {
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    borderRadius: 6,
  },
  dropdownItemText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
