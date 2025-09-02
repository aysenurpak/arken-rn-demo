import { Alert } from "react-native";
import messaging from '@react-native-firebase/messaging';
import { useEffect, useState } from "react";

const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);

        // FCM token alma   
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
    
      }
    };

    const notificationListener = () => {
      // App açıkken gelen mesaj
      const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
        Alert.alert('Yeni Bildirim!', JSON.stringify(remoteMessage.notification));
        setNotifications(prev => [
          ...prev,
          remoteMessage.notification?.title || "Yeni Bildirim"
        ]);
      });

      // App background → user tıklayıp açarsa
      const unsubscribeOnOpened = messaging().onNotificationOpenedApp(remoteMessage => {
        console.log('Notification opened:', remoteMessage);
      });

      const getFCMToken = async () => {
        const token = await messaging().getToken();
        console.log('FCM Token:', token);
        return token;       
        }

      // App kapalı → cold start
      messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log('Initial notification:', remoteMessage);
          }
        });

      return () => {
        unsubscribeOnMessage();
        unsubscribeOnOpened();
        getFCMToken();
      };
    };

    requestUserPermission();
    notificationListener();
  }, []);

  return { notifications };
};

export default useNotification;
