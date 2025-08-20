/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, FlatList, Image, Modal, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styles from "./styles/screens/HomeScreenStyles"
import Card from './components/Card';
import TaskCard from './components/TaskCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import SIZE from './constants/theme';
import { PlusSquare } from 'lucide-react-native';
import COLORS from './constants/color';

function App() {
  const [todos, setTodos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [text, setText] = useState("");
  const [modalType, setModalType] = useState("add"); 
  const [selectedTodo, setSelectedTodo] = useState(null); 

  const nextStatus = (status) => {
    switch (status) {
      case "default":
        return "waiting";
      case "waiting":
        return "temp";
      case "temp":
        return "done";
      case "done":
        return "default";
      default:
        return "default";
    }
  };
  const openModal = (type, todo = null) => {
    setModalType(type);
    setSelectedTodo(todo);
    setText(todo?.todo || ""); 
    setModalVisible(true);
  };
  

  

  const fetchTodos = async () => {
    await axios.get('https://api.mockfly.dev/mocks/64c0a38b-bec1-4b81-b412-ab50a6a7dc8d/todos')
    .then(response => {
      const data = response.data.todos;
      setTodos(data);
    })
    .catch(error => {
      console.error("Error fetching todos:", error);
    });
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />
      <Modal 
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
        <Card 
            title={modalType === "add" ? "Add New Task" : modalType === "edit" ? "Edit Task" : "Delete Task"}
            description={modalType === "add" ? "Enter your task details" : modalType === "edit" ? "Update your task details" : "Are you sure you want to delete this task?"}
          >
            {modalType !== "delete" && (
              <TextInput 
                value={text} 
                onChangeText={setText} 
                placeholder='Task Title' 
                style={styles.input}
              />
            )}

            <Button 
              title={modalType === "add" ? "Submit" : modalType === "edit" ? "Update" : "Delete"}
              onPress={async () => {
                try {
                  if (modalType === "add") {
                    if (!text.trim()) {
                      alert("Please enter a task title.");
                      return;
                    }
                    const response = await axios.post('https://dummyjson.com/todos/add', {
                      todo: text,
                      completed: false,
                      userId: 1,
                    });
                    setTodos(prev => [{...response.data, id: Math.random(), danger: true}, ...prev]);
                  } else if (modalType === "edit") {
                    await axios.put(`https://dummyjson.com/todos/${selectedTodo.id}`, { todo: text });
                    setTodos(prev => prev.map(todo => todo.id === selectedTodo.id ? {...todo, todo: text} : todo));
                  } else if (modalType === "delete") {
                    await axios.delete(`https://dummyjson.com/todos/${selectedTodo.id}`);
                    setTodos(prev => prev.filter(todo => todo.id !== selectedTodo.id));
                  }
                  setModalVisible(false);
                  setText("");
                } catch (error) {
                  console.error("Error in modal action:", error);
                }
              }}
            />
          </Card>
        </View>
      </Modal>
 

      <SafeAreaView  style={styles.container}>
        <Card title={"Arken Yazılım"} description={"ToDo List Description"}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section/Context title</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <PlusSquare color={COLORS.gray} />
            </TouchableOpacity>
          </View>
          <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZE.medium, gap: SIZE.medium }}
          renderItem={({ item }) => (
            <TaskCard 
                task={item.todo} 
                theme={item.status} 
                danger={item.danger}
                onPress={() => setTodos(prev => prev.map(todo => 
                  todo.id === item.id ? {...todo, status: nextStatus(todo.status)} : todo
                ))}
                onEdit={() => openModal("edit", item)}
                onDelete={() => openModal("delete", item)}
              />
            )}
          />
        </Card>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}


function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <NewAppScreen
        templateFileName="App.tsx"
        safeAreaInsets={safeAreaInsets}
      />
    </View>
  );
}

export default App; 