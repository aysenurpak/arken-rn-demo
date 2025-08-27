import { StyleSheet } from "react-native";
import SIZE from "../../constants/theme";
import COLORS from "../../constants/color";

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "black" },
    overlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    scanArea: {
      width: 250,
      height: 250,
      borderWidth: 2,
      borderColor: "white",
      borderRadius: 12,
      backgroundColor: "transparent",
    },
    infoContainer: {
      position: "absolute",
      top: 80,
      left: 20,
      alignItems: "flex-start",
      
    },
    titleText: {
      color: "white",
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 4,
    },
    subtitleText: {
      color: "white",
      fontSize: 16,
    },
    closeButton: {
      position: 'absolute',
      top: 80,
      right: 20,
      zIndex: 99,
      padding: 8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 10,
    },
    closeText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });


  export default styles;