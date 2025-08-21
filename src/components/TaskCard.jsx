import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/components/TaskCardStyles';
import { CheckIcon, CircleAlertIcon, Loader2Icon, PlusSquareIcon, SquarePen, XIcon } from 'lucide-react-native';
import COLORS from '../constants/color';

const TaskCard = ({task, theme = "default", onPress, danger = false, onEdit, onDelete, onAddSubTask, subtasks, newStatusSubtaskCard, onEditSubTask, openSubTaskModal
}) => {
  return (
    <View>
      <TouchableOpacity
        style={[styles.container, styles[`theme${theme}`]]}
        onPress={onPress}
      >
        <View style={[styles.iconContainer, styles[`iconContainer${theme}`]]}>
          {theme === "default" ? (
            <XIcon color={COLORS.gray} />
          ) : theme === "waiting" ? (
            <Loader2Icon color={COLORS.background} />
          ) : theme === "temp" ? (
            <CheckIcon color={COLORS.background} />
          ) : (
            <CheckIcon color={COLORS.background} />
          )}
        </View>

        <Text style={[styles.text, styles[`text${theme}`]]}>
          {task}
        </Text>

        <View style={styles.actionIconsContainer}>
          <TouchableOpacity onPress={onEdit} style={styles.actionIcon}>
            <SquarePen color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onAddSubTask} style={styles.actionIcon}>
            <PlusSquareIcon color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {danger && (
          <View style={styles.dangerIconContainer}>
            <CircleAlertIcon
              color={COLORS.background}
              style={styles.dangerIcon}
            />
          </View>
        )}
      </TouchableOpacity>

      {subtasks && subtasks.length > 0 && (
        <View style={styles.subTaskContainer}>
          {subtasks.map((sub) => (
  <TouchableOpacity
    key={sub.id}
    style={[styles.container, styles[`theme${sub.status}`]]}
    onPress={() => newStatusSubtaskCard(sub.id)} 
  >
    <View style={[styles.iconContainer, styles[`iconContainer${sub.status}`]]}>
      {sub.status === "default" ? (
        <XIcon color={COLORS.gray} />
      ) : sub.status === "waiting" ? (
        <Loader2Icon color={COLORS.background} />
      ) : sub.status === "temp" ? (
        <CheckIcon color={COLORS.background} />
      ) : (
        <CheckIcon color={COLORS.background} />
      )}
    </View>

    <Text style={[styles.text, styles[`text${sub.status}`]]}>
      {sub.title}
    </Text>
    <View style={styles.actionIconsContainer}>
          <TouchableOpacity onPress={() => onEditSubTask(sub)} style={styles.actionIcon}>
            <SquarePen color={COLORS.gray} />
          </TouchableOpacity>
        </View>
  </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default TaskCard;
