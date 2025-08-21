import { Dimensions, StyleSheet } from "react-native";
import COLORS from "../../constants/color";
import SIZES from "../../constants/theme";

export default StyleSheet.create({
    container: {
        width: '90%',
        maxHeight: Dimensions.get('window').height * 0.7,
        overflow: 'hidden',
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: SIZES.large,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: SIZES.large,
        right: SIZES.large,
        zIndex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    innerContent: {
    },
    title: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
    },
    description: {
        color: 'gray',
        fontSize: 16,
        marginTop: SIZES.xSmall,
        marginBottom: SIZES.large,
    },
    text: {
        color: COLORS.green
    }
});