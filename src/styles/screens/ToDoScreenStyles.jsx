import { StyleSheet } from "react-native";
import SIZE from "../../constants/theme";
import COLORS from "../../constants/color";

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.grayTransparent,
    borderRadius: SIZE.small,
    paddingVertical: SIZE.medium,
    paddingHorizontal: SIZE.medium,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'lightblue',
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  },
  closeButtonContainer: {
    position: 'absolute',
},
});


export default styles;