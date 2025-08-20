import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/components/TaskCardStyles';
import { Banana, Check, CheckIcon, CircleAlertIcon, Loader2Icon, SquarePen, Trash2, XIcon } from 'lucide-react-native';
import COLORS from '../constants/color';

const TaskCard = ({ task, theme = "default", onPress, danger = false, onEdit , onDelete  }) => {
    return (
        <TouchableOpacity 
        style={[styles.container, styles[`theme${theme}`]]} 
        onPress={onPress}
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
                {task}
            </Text>

            <View style={styles.actionIconsContainer}>
                <TouchableOpacity onPress={onEdit} style={styles.actionIcon}>
                    <SquarePen color={COLORS.gray} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete} style={styles.actionIcon}>
                    <Trash2 color={COLORS.gray} />
                </TouchableOpacity>
            </View>

            {danger && (
                <View style={styles.dangerIconContainer}>
                    <CircleAlertIcon color={COLORS.background} style={styles.dangerIcon} />
                </View>
            )}
        </TouchableOpacity>
    );
}

export default TaskCard;