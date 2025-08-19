/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import styles from "./styles/screens/HomeScreenStyles"
import Card from './components/Card';
import TaskCard from './components/TaskCard';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />

      <SafeAreaView  style={styles.container}>
        <Card title={"Arken Yazılım"} description={"ToDo List Description"}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Section/Context title</Text>
          </View>
          <TaskCard theme='done'/>
          <TaskCard theme='temp'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='default'/>
          <TaskCard theme='waiting'/>
          <TaskCard theme='waiting'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='default'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
          <TaskCard theme='done'/>
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
