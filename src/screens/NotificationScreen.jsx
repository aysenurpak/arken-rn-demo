import React from 'react';
import { View, Text, Pressable, StatusBar } from "react-native";
import { Bell } from 'lucide-react-native'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/color';
import SIZE from '../constants/theme';
import useNotification from '../hooks/useNotification';

const NotificationScreen = () => {
  const {notifications} = useNotification();
  const notificationCount = notifications.length;
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
          <Bell color={COLORS.gray} />
          {notificationCount >= 0 && (
            <View style={{
              position: 'absolute',
              top: -SIZE.xSmall,
              right: -SIZE.xSmall,
              backgroundColor: COLORS.background,
              borderRadius: SIZE.small,
              width: SIZE.large,
              height: SIZE.large,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold' }}>
                {notificationCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notification Screen</Text>
      </View>
    </SafeAreaView>
  );
}

export default NotificationScreen;
