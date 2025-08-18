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
import styles from "./styles/HomeScreenStyles"
import Card from './components/Card';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'dark-content'} />

      <SafeAreaView  style={styles.container}>
        <Card title={"Arken Yazılım"} description={"ToDo List Description"}>
          <Text>This is the inner content of the card.</Text>
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
