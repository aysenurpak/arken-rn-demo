import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatListScreen from './ChatListScreen';
import ChatScreen from './ChatScreen';
import NewChatScreen from './NewChatScreen';
import { Pressable } from 'react-native';
import { Plus } from 'lucide-react-native';

const Stack = createNativeStackNavigator();

const ChatApp = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ChatList" 
        component={ChatListScreen} 
        options={({ navigation }) => ({
          title: "Sohbetler",
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("NewChat")}>
              <Plus size={24} color="black" />
            </Pressable>
          ),
        })} 
      />
      <Stack.Screen 
        name="NewChat" 
        component={NewChatScreen} 
        options={{ title: "Yeni Sohbet" }} 
      />
      <Stack.Screen 
        name="ChatScreen" 
        component={ChatScreen} 
        options={({ route }) => ({ title: route.params?.username || "Sohbet" })} 
      />
    </Stack.Navigator>
  );
};

export default ChatApp;
