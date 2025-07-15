import React from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

interface AddGoalModalProps {
  visible: boolean;
  onClose: () => void;
  goalName: string;
  setGoalName: (name: string) => void;
  goalType: string;
  setGoalType: (type: string) => void;
  onSubmit: () => void;
}

export default function AddGoal({
  visible,
  onClose,
  goalName,
  setGoalName,
  goalType,
  setGoalType,
  onSubmit,
}: AddGoalModalProps) {
  const addGoal = () => {};

  return (
    <Modal
      visible={visible}
      transparent={true}
      //onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity style={styles.closeModal} onPress={onClose}>
              <Text style={styles.x}>Cancel</Text>
            </TouchableOpacity>

            <Text style={styles.modalTitle}>New Goal</Text>
            <View style={styles.placeholder}></View>
          </View>

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <View style={{ width: "100%" }}>
              <TextInput
                style={styles.inputs}
                placeholder="Name"
                value={goalName}
                onChangeText={setGoalName}
              ></TextInput>
              <TextInput
                style={styles.descriptionInput}
                placeholder="Description"
                multiline={true}
                textAlignVertical="top"
              ></TextInput>
            </View>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                      <View style={{ flex: 1 }}>
                        <TextInput style={styles.inputs} placeholder="Name"></TextInput>
                        <TextInput
                          style={styles.descriptionInput}
                          placeholder="Description"
                          multiline={true}
                          textAlignVertical="top"
                        ></TextInput>
                      </View>
                    </TouchableWithoutFeedback> */}
            <View style={styles.typeContainer}>
              <TouchableOpacity
                style={[
                  styles.type,
                  goalType == "Daily" && styles.selectedType,
                ]}
                onPress={() => setGoalType("Daily")}
              >
                <Text style={styles.typeText}>Daily</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.type,
                  goalType == "Weekly" && styles.selectedType,
                ]}
                onPress={() => setGoalType("Weekly")}
              >
                <Text style={styles.typeText}>Weekly</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.type,
                  goalType == "Milestone" && styles.selectedType,
                ]}
                onPress={() => setGoalType("Milestone")}
              >
                <Text style={styles.typeText}>Milestone</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.addGoal} onPress={onSubmit}>
              <Text style={styles.x}>Add Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalContainer: {
    height: "80%",
    width: "90%",
    backgroundColor: "#222",
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#888",
  },
  modalHeader: {
    height: "12.5%",
    width: "100%",
    backgroundColor: "#444",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: "5%",
  },
  placeholder: {
    width: "15%",
    aspectRatio: 1,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold",
  },
  closeModal: {
    width: "15%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  x: {
    color: "white",
    fontSize: 15,
  },
  inputs: {
    height: 48,
    marginHorizontal: "5%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
  },
  descriptionInput: {
    height: 192,
    marginHorizontal: "5%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
  },
  typeContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: "5%",
    width: "100%",
    marginBottom: "10%",
  },
  type: {
    width: "25%",
    aspectRatio: 1,
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedType: {
    borderColor: "#00ff1a",
  },
  typeText: {
    color: "#888",
  },
  addGoal: {
    width: "40%",
    height: "10%",
    borderRadius: 8,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
