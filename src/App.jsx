import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from "react-native";
import ToDoScreen from "./screens/ToDoScreen";
import QRScannerScreen from './screens/QrScannerScreen';
import AScreen from "./screens/AScreen";
import BScreen from "./screens/BScreen";
import CScreen from "./screens/CScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="ToDo" component={ToDoScreen} />
      <Stack.Screen options={{headerShown: false}} name="QRScanner" component={QRScannerScreen} />
      <Stack.Screen options={{headerShown: false}} name="A" component={AScreen} />
      <Stack.Screen options={{headerShown: false}} name="B" component={BScreen} />
      <Stack.Screen options={{headerShown: false}} name="C" component={CScreen} />
      

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;