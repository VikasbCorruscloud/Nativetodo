import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SubmitTodo from "./SubmitTodo";

interface Task {
  id: string;
  title: string;
  description: string;
}
const tasks: Task[] = [
  { id: "1", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "2", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "3", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "4", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "5", title: "Sample Task 1", description: "Sample Task 2" },
];

const completed: Task[] = [
  { id: "1", title: "Completed Task 1", description: "Sample Task 2" },
  { id: "2", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "3", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "4", title: "Sample Task 1", description: "Sample Task 2" },
  { id: "5", title: "Sample Task 1", description: "Sample Task 2" },
];

const Todo = () => {
  return (
    <View className="flex-1 bg-[#FFFFFF] p-3">
      <Text className="text-2xl mb-2">Todo App</Text>

      {/* Task List */}
      {tasks.length == 0 ? (
        <Text className="mt-3 text-xl">No task added! Add task...</Text>
      ) : (
        <FlatList
        className=" h-[300px] "
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="  flex-row justify-between w-full p-3 items-center border h-[80px] border-[#E8E8E8] rounded-lg mt-2">
              <View className="h-[80px] w-[8px] bg-[#80BBE6] absolute rounded-l-lg " />
              <View className="w-[300px] ml-4">
                <Text>{item.title}</Text>
                <Text className="text-[#8B8B8B]">{item.description}</Text>
              </View>
              <TouchableOpacity>
                <Text className="rounded-xl bg-[#F6F6F6] h-[20px] w-[21px] border border-[#C6D0D0]" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <Text className="mt-2 text-black text-xl">Completed</Text>
      {/* Completed Tasks */}
      <FlatList
       className=" h-[300px] "
        data={completed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="flex-row justify-between w-full bg-[#EBEBEB] p-3 items-center border h-[80px] border-[#E8E8E8] rounded-lg mt-2">
            <View className="h-[80px] w-[8px] bg-[#80BBE6] absolute rounded-l-lg " />
            <View className="w-[300px] ml-4">
              <Text>{item.title}</Text>
              <Text className="text-[#8B8B8B]">{item.description}</Text>
            </View>
            <TouchableOpacity>
              <Text className="border border-[#80BBE6] h-[20px] w-[20px] bg-[#FFFFFF] rounded-xl">
                <Ionicons name="checkmark" size={20} color="#80BBE6" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <SubmitTodo />
    </View>
  );
};

export default Todo;
