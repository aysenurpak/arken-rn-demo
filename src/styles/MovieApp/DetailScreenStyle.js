import { StyleSheet } from 'react-native';
import COLORS from '../../constants/color';
import SIZE from '../../constants/theme';

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SIZE.medium,
        paddingVertical: SIZE.small,
        marginRight: 8,
        backgroundColor: COLORS.gray,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: SIZE.small,
    },
    genreContainer: {
        borderRadius: SIZE.large,   
    },
    text: {
        color: COLORS.background,
        fontSize: 14,
    },
    badgeContainer: {
        borderRadius: SIZE.small,
    },
});
export default styles;
