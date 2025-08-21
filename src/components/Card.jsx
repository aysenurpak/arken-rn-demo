import { ScrollView, Text, Touchable, TouchableOpacity, View } from "react-native";

import styles from "../styles/components/CardStyles";
import { useEffect, useState } from "react";
import { Star, X } from "lucide-react-native";
import SIZE from "../constants/theme";

const Card = ({ title, description, onClose = null, children }) => {
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
    {onClose &&
      (<TouchableOpacity style={styles.closeButtonContainer} onPress={onClose}>
       <X/>
    </TouchableOpacity>)}
    
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.content}>
            {children}
        </View>
    </View>
  );
};

export default Card;
