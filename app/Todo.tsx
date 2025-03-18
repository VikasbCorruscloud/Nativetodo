import { View, Text, TouchableOpacity, FlatList ,Pressable  } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SubmitTodo from "./SubmitTodo";

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const Todo = () => {
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [completeTasks, setCompleteTasks] = useState<Todo[]>([]);
  const [editTask, setEditTask] = useState<Todo | null>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Fetch todos from API
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          "https://training-backend-api.onrender.com/todos"
        );
        const data = await response.json();
        console.log(data);
        setTasks(data.filter((todo: Todo) => !todo.completed));
        setCompleteTasks(data.filter((todo: Todo) => todo.completed));
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []);

  // Move task to completed
  const completeTask = async (todo: Todo) => {
    try {
      await fetch(
        `https://training-backend-api.onrender.com/todos/${todo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...todo, completed: true }),
        }
      );

      setCompleteTasks((prev) => [...prev, { ...todo, completed: true }]);
      setTasks((prev) => prev.filter((t) => t.id !== todo.id));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  // Remove task from completed list
  const deleteTask = async (id: number) => {
    try {
      await fetch(`https://training-backend-api.onrender.com/todos/${id}`, {
        method: "DELETE",
      });
      setCompleteTasks((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <View className="flex-1 bg-[#FFFFFF] p-3">
      <Text className="text-2xl mb-2">Todo App</Text>

      {/* Task List */}
      {tasks.length == 0 ? (
        <View className=" h-[250px] ">
          <Text className="mt-3 text-xl">No task added! Add task...</Text>
        </View>
      ) : (
        <FlatList
          className=" h-[260px] "
          data={tasks}
          renderItem={({ item }) => (
            <Pressable 
            onPress={()=>setEditTask(item)}
            className=" flex-row justify-between w-full p-3 items-center border h-[80px] border-[#E8E8E8] rounded-lg mt-2">
              <View className="h-[80px] w-[8px] bg-[#80BBE6] absolute rounded-l-lg " />
              <View className="w-[300px] ml-4">
                <Text>{item.title}</Text>
                <Text className="text-[#8B8B8B]">{item.description}</Text>
              </View>
              <TouchableOpacity onPress={() => completeTask(item)}>
                <Text className="rounded-xl bg-[#F6F6F6] h-[20px] w-[21px] border border-[#C6D0D0]" />
              </TouchableOpacity>
            </Pressable>
          )}
        />
      )}

      <Text className="mt-2 text-black text-xl">Completed</Text>
      {/* Completed Tasks */}
      <FlatList
        className=" h-[300px] "
        data={completeTasks}
        renderItem={({ item }) => (
          <View className="flex-row justify-between w-full bg-[#EBEBEB] p-3 items-center border h-[80px] border-[#E8E8E8] rounded-lg mt-2">
            <View className="h-[80px] w-[8px] bg-[#80BBE6] absolute rounded-l-lg " />
            <View className="w-[300px] ml-4">
              <Text>{item.title}</Text>
              <Text className="text-[#8B8B8B]">{item.description}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteTask(item.id)}>
              <Text className="border border-[#80BBE6] h-[20px] w-[20px] bg-[#FFFFFF] rounded-xl">
                <Ionicons name="checkmark" size={20} color="#80BBE6" />
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <SubmitTodo
              setTasks={setTasks}
              editTask={editTask}
              editIndex={editIndex}
              setEditTask={setEditTask}
              setEditIndex={setEditIndex}
      />
    </View>
  );
};

export default Todo;
