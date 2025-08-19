import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/components/TaskCardStyles';
import { Check, CheckIcon, Loader2Icon, XIcon } from 'lucide-react-native';
import COLORS from '../constants/color';

const TaskCard = ({ task, theme = "default", onPress }) => {
    return (
        <TouchableOpacity 
        style={[styles.container, styles[`theme${theme}`]]} 
        onPress={() => onPress(task)}
        >
            <View style={[styles.iconContainer, styles[`iconContainer${theme}`]]}>
            {
                theme === "default" ? (
                    <XIcon color={COLORS.gray} />
                ) : theme === "waiting" ? (
                    <Loader2Icon color={COLORS.background} />
                ) : theme === "temp" ? (
                    <CheckIcon color={COLORS.background} />
                ) : (
                    <CheckIcon color={COLORS.background} />
                )
            }
            </View>

            <Text style={[styles.text, styles[`text${theme}`]]}>
                {"Your task here..."}
            </Text>
        </TouchableOpacity>
    );
}

export default TaskCard;