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

  const fetchTodos = async () => {
    await axios.get('https://dummyjson.com/todos')
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
        onRequestClose={() => {}}
      >
        <View style={styles.modalContainer}>
          <Card title={"Add New Task"} description={"Enter your task details"}>
            <TextInput value={text} onChangeText={(value) => setText(value)} placeholder='Task Title' style={styles.input}/>
            <Button title='Submit' onPress={async () => {
              if (!text.trim()) {
                alert("Please enter a task title.");
                return;
              }

              await axios.post('https://dummyjson.com/todos/add', {
                todo: text,
                completed: false,
                userId: 1,
              }).then(response => {
                setTodos(prev => [{...response.data, id: Math.random(), danger: true}, ...prev]);
                setText("");
                setModalVisible(false);
              }).catch(error => {
                console.error("Error adding todo:", error);
              });
            }}/>
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
              theme={item.completed ? "done" : "default"} 
              danger={item.danger}
              onPress={() => {
                setTodos(prev => prev.map(todo => 
                  todo.id === item.id ? {...todo, completed: !todo.completed } : todo
                ));
              }} 
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
