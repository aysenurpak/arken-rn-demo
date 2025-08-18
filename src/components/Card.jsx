import { Text, View } from "react-native";

import styles from "../styles/CardStyles";

const Card = ({ title, description, children }) => {
  return (
    <View style={styles.container}> 
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>

        <View style={styles.content}>
            <Text style={styles.innerContent}>{children}</Text>
        </View>
    </View>
  );
};

export default Card;
