import { ScrollView, Text, View } from "react-native";

import styles from "../styles/components/CardStyles";
import { useEffect, useState } from "react";
import { Star } from "lucide-react-native";
import SIZE from "../constants/theme";

const Card = ({ title, description, children }) => {
  const [data, setData] = useState("Loading...");

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setData("This is some fetched data from an API or database.");
      }, 5000);

      // Here you would typically fetch data from an API or database
    }

    fetchData()
  }, []);

  return (
    <View style={styles.container}> 
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, gap: SIZE.medium }} style={styles.content}>
            {children}
        </ScrollView>
    </View>
  );
};

export default Card;
