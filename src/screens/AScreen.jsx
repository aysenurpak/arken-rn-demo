import { SafeAreaView } from "react-native-safe-area-context";
import { Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AScreen = () => {
  const navigation = useNavigation();
  const [demoState, setDemoState] = useState();

  useEffect(() => {
    const fetchDemo = async () => {
      try {

        await AsyncStorage.getItem("demoState").then(value => {
          setDemoState(value);
        });
      } catch (error) {
        console.error("Error in AScreen:", error);
      }
    }

    fetchDemo();
  }, []);

  return (
    <SafeAreaView style= {StyleSheet.container}>
    <Text onPress={() => navigation.goBack()}>A Screen</Text>
    <Text>Demo State: {demoState}</Text>
    </SafeAreaView>
    );

}

export default AScreen;