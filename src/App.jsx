import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import ToDoScreen from "./screens/ToDoScreen";
import QRScannerScreen from './screens/QrScannerScreen';
import NotificationScreen from "./screens/NotificationScreen";
import AScreen from "./screens/AScreen";
import BScreen from "./screens/BScreen";
import CScreen from "./screens/CScreen";
import MovieApp from './screens/MovieApp/MovieApp';
import DetailScreen from "./screens/MovieApp/DetailScreen";
import { DemoProvider } from "./hooks/useDemo";
import messaging, { firebase } from '@react-native-firebase/messaging';
import { Alert } from "react-native";
import { useEffect } from "react";
import useNotification from "./hooks/useNotification";


// Initialize Firebase before using any Firebase services
firebase.initializeApp();

const Stack = createNativeStackNavigator();


const App = () => {
  useNotification();

  return (
    <DemoProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{headerShown: false}} name="ToDo" component={ToDoScreen} />
          <Stack.Screen options={{headerShown: false}} name="Notification" component={NotificationScreen} />
          <Stack.Screen options={{headerShown: false}} name="QRScanner" component={QRScannerScreen} />
          <Stack.Screen options={{headerShown: false}} name="A" component={AScreen} />
          <Stack.Screen options={{headerShown: false}} name="B" component={BScreen} />
          <Stack.Screen options={{headerShown: false}} name="C" component={CScreen} />
          <Stack.Screen options={{headerShown: false}} name="MovieApp" component={MovieApp} />
          <Stack.Screen options={{headerShown: false}} name="DetailScreen" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DemoProvider>
  );
};

export default App;