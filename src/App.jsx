/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Button, FlatList, Image, Modal, Pressable, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
  const [subTaskModalVisible, setSubTaskModalVisible] = useState(false);
  const [currentTodoForSubTask, setCurrentTodoForSubTask] = useState(null);
  const [subTaskText, setSubTaskText] = useState("");

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
  const newStatusSubtaskCard = (parentId, subId) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === parentId) {
          return {
            ...todo,
            subtasks: (todo.subtasks || []).map(sub =>
              sub.id === subId
                ? { ...sub, status: nextStatus(sub.status) }
                : sub
            ),
          };
        }
        return todo;
      })
    );
  };


  const openModal = (type, todo = null) => {
    setModalType(type);
    setSelectedTodo(todo);
    setText(todo?.todo || "");
    setModalVisible(true);
  };
  const clearModal = () => {
    setModalVisible(false);
    setText("");
    setSelectedTodo(null);
    setModalType("add");
  }
  const openSubTaskModal = (subtask, parentTodo) => {
    setCurrentTodoForSubTask(parentTodo);
    setSelectedTodo(subtask);
    setSubTaskText(subtask.title);
    setModalType("editSubtask");
    setSubTaskModalVisible(true);
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
        onRequestClose={clearModal}
      >

        <Pressable onPress={clearModal} style={styles.modalContainer}>
          <Pressable onPress={(e) => e.stopPropagation()} style={styles.modalContent} >
            <Card
              onClose={clearModal}
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

              <View style={{ flexDirection: modalType === "add" ? "column" : "row", justifyContent: modalType === "add" ? "center" : "space-between", }}>

                {
                  modalType !== "add" && (
                    <Button title='Delete Task' color={COLORS.red} onPress={() => setTodos(prev => prev.filter(todo => todo.id !== selectedTodo.id))}>
                      Delete Task
                    </Button>
                  )
                }

                <Button
                  title={modalType === "add" ? "Submit" : "Update"}
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
                        setTodos(prev => [{ ...response.data, id: Math.random(), status: 'default', danger: true }, ...prev]);
                      } else if (modalType === "edit") {
                        //await axios.put(`https://dummyjson.com/todos/${selectedTodo.id}`, { todo: text });
                        setTodos(prev => prev.map(todo => todo.id === selectedTodo.id ? { ...todo, todo: text } : todo));
                      } else if (modalType === "delete") {
                        //await axios.delete(`https://dummyjson.com/todos/${selectedTodo.id}`);
                        setTodos(prev => prev.filter(todo => todo.id !== selectedTodo.id));
                      }
                      clearModal();
                    } catch (error) {
                      console.error("Error in modal action:", error);
                    }
                  }}
                />
              </View>
            </Card>
          </Pressable>
        </Pressable>
      </Modal>

      <Modal
        visible={subTaskModalVisible}
        animationType="fade"
        transparent
        onRequestClose={() => setSubTaskModalVisible(false)}
      >
        <Pressable onPress={() => setSubTaskModalVisible(false)} style={styles.modalContainer}>
          <Pressable onPress={(e) => e.stopPropagation()} style={styles.modalContent}>
            <Card
              onClose={() => setSubTaskModalVisible(false)}
              title={modalType === "editSubtask" ? "Edit Subtask" : "Add Subtask"}
              description={modalType === "editSubtask" ? "Update or delete this subtask" : "Enter subtask details"}
            >
              <TextInput
                value={subTaskText}
                onChangeText={setSubTaskText}
                placeholder='Subtask Title'
                style={styles.input}
              />

              <View style={{ flexDirection: modalType === "editSubtask" ? "row" : "column", justifyContent: modalType === "editSubtask" ? "space-between" : "center" }}>



                {modalType === "editSubtask" && (
                  <Button
                    title="Delete Subtask"
                    color={COLORS.red}
                    onPress={() => {
                      setTodos(prev =>
                        prev.map(todo => {
                          if (todo.id === currentTodoForSubTask.id) {
                            return {
                              ...todo,
                              subtasks: todo.subtasks.filter(sub => sub.id !== selectedTodo.id)
                            };
                          }
                          return todo;
                        })
                      );
                      setSubTaskText("");
                      setSelectedTodo(null);
                      setSubTaskModalVisible(false);
                    }}
                  />
                )}


                <Button
                  title={modalType === "editSubtask" ? "Update" : "Submit"}
                  onPress={() => {
                    if (!subTaskText.trim()) {
                      alert("Please enter a subtask title.");
                      return;
                    }

                    if (modalType === "editSubtask") {
                      setTodos(prev =>
                        prev.map(todo => {
                          if (todo.id === currentTodoForSubTask.id) {
                            return {
                              ...todo,
                              subtasks: todo.subtasks.map(sub =>
                                sub.id === selectedTodo.id ? { ...sub, title: subTaskText } : sub
                              )
                            };
                          }
                          return todo;
                        })
                      );
                    } else {
                      setTodos(prev =>
                        prev.map(todo =>
                          todo.id === currentTodoForSubTask.id
                            ? {
                              ...todo,
                              subtasks: [
                                ...(todo.subtasks || []),
                                { id: Math.random(), title: subTaskText, status: "default" }
                              ]
                            }
                            : todo
                        )
                      );
                    }

                    setSubTaskText("");
                    setSelectedTodo(null);
                    setSubTaskModalVisible(false);
                  }}
                />
              </View>

            </Card>
          </Pressable>
        </Pressable>
      </Modal>



      <SafeAreaView style={styles.container}>
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
                subtasks={item.subtasks}
                onPress={() => setTodos(prev => prev.map(todo =>
                  todo.id === item.id ? { ...todo, status: nextStatus(todo.status) } : todo
                ))}
                newStatusSubtaskCard={(subId) => newStatusSubtaskCard(item.id, subId)}
                onEdit={() => openModal("edit", item)}
                onDelete={() => openModal("delete", item)}
                onAddSubTask={() => {
                  setCurrentTodoForSubTask(item);
                  setSubTaskText("");
                  setSubTaskModalVisible(true);
                }}
                onEditSubTask={(sub) => openSubTaskModal(sub, item)}
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