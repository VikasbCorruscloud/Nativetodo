import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface SubmitButtonProps {
  setTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
  editTask: Todo | null;
  editIndex: number | null;
  setEditTask: React.Dispatch<React.SetStateAction<Todo | null>>;
  setEditIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
const SubmitTodo: React.FC<SubmitButtonProps> = ({
  setTasks,
  editTask,
  editIndex,
  setEditTask,
  setEditIndex,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //  form fields when an edit task is selected
  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setShowForm(true);
    }
  }, [editTask]);
  
  const handleSubmit = async () => {
    if (title.trim() === "") return;
  
    if (editTask) {
      // Update existing task using ID instead of array index
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === editTask.id ? { ...t, title, description } : t
        )
      );
      setEditTask(null);
      setEditIndex(null);
    } else {
      // Creating a new todo
      try {
        const response = await fetch(
          "https://training-backend-api.onrender.com/todos",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description }),
          }
        );
        const newTodo = await response.json();
        setTasks((prev) => [...prev, newTodo]);
      } catch (error) {
        console.error("Error creating todo:", error);
      }
    }
  
    // Reset form state
    setTitle("");
    setDescription("");
    setShowForm(false);
  };
  

  return (
    <>
      {/* Add Task Button */}
      <TouchableOpacity
        onPress={() => setShowForm(true)}
        className="bg-[#4884AE] h-[48px]  rounded-lg  my-3 "
      >
        <Text className="text-[#FFFCFC] text-center py-4 font-semibold">
          Add Task
        </Text>
      </TouchableOpacity>

      {/* Task Form */}
      {showForm && (
        <View>
          <View className="absolute bottom-0 left-0 right-0 ">
            <View className="bg-white rounded-t-xl  h-[410px]">
              {/* Header */}
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold">
                  {" "}
                  {editTask ? "Edit Task" : "New Task"}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowForm(false);
                    setEditTask(null);
                    setEditIndex(null);
                    setTitle("");
                    setDescription("");
                  }}
                  className="bg-[#DBDBDB] rounded-full w-[30px] h-[30px] flex items-center justify-center"
                >
                  <Text className="text-black font-bold h-[16px]">X</Text>
                </TouchableOpacity>
              </View>

              {/* Inputs field */}
              <View className="gap-4">
                {/* Title Input */}
                <View>
                  <Text className="text-lg font-medium mb-3">Title</Text>
                  <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter the title of your task"
                    className="border border-[#D7D7D7] p-3 rounded-md h-[48px]"
                  />
                </View>

                {/* Description Input */}
                <View>
                  <Text className="text-lg font-medium mb-3">Description</Text>
                  <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter the description of your task"
                    className="border border-[#D7D7D7]  p-3 rounded-md"
                    multiline
                    style={{ height: 100, textAlignVertical: "top" }} // Ensures 4-line space
                  />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  className="bg-[#4884AE] h-[48px]  rounded-lg my-6 "
                >
                  <Text className="text-[#FFFCFC] text-center py-4 font-semibold">
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default SubmitTodo;
