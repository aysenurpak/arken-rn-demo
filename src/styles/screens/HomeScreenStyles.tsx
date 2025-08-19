import { StyleSheet } from "react-native";
import SIZE from "../../constants/theme";
import COLORS from "../../constants/color";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  section: {
    paddingBottom: SIZE.small,
    borderBottomWidth: 1,
    borderColor: COLORS.grayTransparent
  },
  sectionTitle: {
    fontSize: SIZE.large,
    fontWeight: 'bold',
    color: COLORS.gray
  },
  top: {
    flex: 1
  },
  bottom: {
    flex: 1,
    backgroundColor: 'lightgray',
    padding: 20
  },
  text: {
    fontSize: 30
  },
  square: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  },
  image: {
    width: 500,
    height: 200,
  }
});

export default styles;