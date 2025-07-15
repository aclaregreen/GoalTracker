import React, { useState } from "react";
import {
  StyleSheet,
  Modal,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  SafeAreaView,
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
  const [typeModalVisible, setTypeModalVisible] = useState(false);

  return (
    <Modal visible={visible} transparent={true}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#333" }}>
        <View style={styles.modal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity style={styles.closeModal} onPress={onClose}>
                <Text style={styles.x}>Cancel</Text>
              </TouchableOpacity>

              <Text style={styles.modalTitle}>New Goal</Text>
              <View style={styles.placeholder}></View>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContainer}
              style={{ flex: 1 }}
            >
              {/* <View style={styles.scrollContainer}> */}
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
              <TouchableOpacity
                style={styles.typeSelector}
                onPress={() => setTypeModalVisible(true)}
              >
                <Text style={styles.typeText}>
                  {goalType ? goalType : "Select Goal Type"}
                </Text>
              </TouchableOpacity>
              <Modal
                visible={typeModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setTypeModalVisible(false)}
              >
                <TouchableOpacity
                  style={styles.typeModal}
                  activeOpacity={1}
                  onPressOut={() => setTypeModalVisible(false)}
                >
                  <View style={styles.selectMenu}>
                    <View style={styles.typeHeader}>
                      <Text style={styles.modalTitle}>Goal Type</Text>
                    </View>
                    <View style={styles.typeContainer}>
                      <TouchableOpacity
                        style={styles.type}
                        onPress={() => {
                          setGoalType("Daily"), setTypeModalVisible(false);
                        }}
                      >
                        <Text style={styles.typeText}>Daily</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.type}
                        onPress={() => {
                          setGoalType("Weekly"), setTypeModalVisible(false);
                        }}
                      >
                        <Text style={styles.typeText}>Weekly</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.type}
                        onPress={() => {
                          setGoalType("Milestone"), setTypeModalVisible(false);
                        }}
                      >
                        <Text style={styles.typeText}>Milestone</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
            </ScrollView>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.addGoal} onPress={onSubmit}>
                <Text style={styles.x}>Add Goal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
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
    height: "100%",
    width: "100%",
    backgroundColor: "#222",
    // borderRadius: 5,
    // borderWidth: 2,
    // borderColor: "#888",
  },
  modalHeader: {
    height: "5%",
    width: "100%",
    backgroundColor: "#333",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    marginBottom: "5%",
  },
  footer: {
    height: "10%",
    width: "100%",
    backgroundColor: "#333",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholder: {
    width: "15%",
    aspectRatio: 1,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 20,
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
  scrollContainer: {
    // justifyContent: "center",
    // backgroundColor: "blue",
    alignItems: "center",
    flex: 1,
  },
  inputs: {
    height: "10%",
    width: "90%",
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
    height: "20%",
    width: "90%",
    marginHorizontal: "5%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
  },
  typeModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  selectMenu: {
    height: "30%",
    width: "100%",
    backgroundColor: "#333",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  typeSelector: {
    height: "10%",
    marginHorizontal: "5%",
    width: "90%",
    borderColor: "#888",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#fff",
    justifyContent: "center",
  },
  typeHeader: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: "5%",
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
    color: "#fff",
  },
  addGoal: {
    width: "40%",
    height: "60%",
    borderRadius: 8,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
});
