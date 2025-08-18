import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '90%',
        height: 200,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        padding: 20,
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
        marginTop: 10,
        marginBottom: 40,
    }
});