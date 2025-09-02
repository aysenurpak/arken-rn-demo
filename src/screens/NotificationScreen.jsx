import React from 'react';
import { View, Text, Pressable, StatusBar } from "react-native";
import { Bell } from 'lucide-react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/color';
import SIZE from '../constants/theme';

const NotificationScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <StatusBar barStyle="dark-content" />

      <View style={{
        height: SIZE.xxLarge,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZE.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.gray
      }}>
        <Text style={{ fontSize: SIZE.large, fontWeight: 'bold' }}>Bildirimler</Text>

        <Pressable onPress={() => console.log("Bell clicked")}>
          <Bell/>
        </Pressable>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default NotificationScreen;
