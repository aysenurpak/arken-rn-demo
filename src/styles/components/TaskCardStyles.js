import { Dimensions, StyleSheet } from "react-native";
import SIZE from "../../constants/theme";
import COLORS from "../../constants/color";

export default StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: SIZE.large,
        flexDirection: "row",
        alignItems: "center",
        gap: SIZE.small,
        paddingVertical: SIZE.small,
        paddingHorizontal: SIZE.medium,
    },
    themedefault: {
        backgroundColor: COLORS.grayTransparent,
    },
    themewaiting: {
        backgroundColor: COLORS.yellowTransparent,
    },
    themetemp: {
        backgroundColor: COLORS.blueTransparent,
    },
    themedone: {
        backgroundColor: COLORS.greenTransparent,
    },
    iconContainer: {
        width: SIZE.xxLarge,
        height: SIZE.xxLarge,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(53, 56, 62, 0.1)",
        borderRadius: SIZE.xSmall,
    },
    iconContainerwaiting: {
        backgroundColor: COLORS.yellow,
    },
    iconContainertemp: {
        backgroundColor: COLORS.blue,
    },
    iconContainerdone: {
        backgroundColor: COLORS.green,
    },
    text: {
        maxWidth: '85%',
        color: "black",
        fontSize: SIZE.medium,
        fontWeight: "500",
        flex: 1,
    },
    textwaiting: {
        color: COLORS.yellow,
        fontWeight: "bold",
    },
    texttemp: {
        color: COLORS.blue,
        fontWeight: "normal",
    },
    textdone: {
        color: COLORS.green,
        fontWeight: "normal",
    },
    dangerIconContainer: {
        width: SIZE.xxLarge,
        height: SIZE.xxLarge,
        borderRadius: SIZE.xSmall,
        alignItems: "center",
        justifyContent: "center",
        right: SIZE.xSmall,
        backgroundColor: COLORS.red,
        
      },
      actionIconsContainer: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginLeft: 8,
      },
      XIconContainer: {
        width: SIZE.xxLarge,
        height: SIZE.xxLarge,
        borderRadius: SIZE.xSmall,
        alignItems: "center",
        justifyContent: "center",
        right: SIZE.xSmall,
      },
      subTaskContainer: {
        paddingLeft: SIZE.large,
        marginTop: SIZE.xSmall,
        gap: SIZE.xSmall, 
        
      },
      subTaskIconContainer: {
        width: SIZE.xxLarge,
        height: SIZE.xxLarge,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SIZE.xSmall,
        backgroundColor: COLORS.grayTransparent, 
      },
      subTaskText: {
        flex: 1,
        fontSize: SIZE.small,
        color: COLORS.black,
      }
      
    
    });