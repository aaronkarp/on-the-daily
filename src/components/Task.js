import { Button, Checkbox, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import { DeleteRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  listItem: {
    fontSize: tokens.fontSizeBase600,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: tokens.borderRadiusLarge,
    boxShadow: tokens.shadow16,
    marginBottom: tokens.spacingVerticalL,
    display: 'grid',
    gridTemplateColumns: '1fr 14fr 1fr',
    alignItems: 'center'
  },
  listItemDone: {
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForeground4,
    backgroundColor: tokens.colorNeutralBackground3,
    gridTemplateColumns: '1fr 10fr 1fr',
    boxShadow: tokens.shadow2
  },
  taskName: {
    fontWeight: tokens.fontWeightMedium
  }
});

function Task({ task }) {
  const { toggleTask, deleteTask } = useTasks();
  const classes = useStyles();

  function handleToggle() {
    toggleTask(task.id);
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteTask(task.id);
  }

  return (
    <li className={task.done ? mergeClasses(classes.listItem, classes.listItemDone) : classes.listItem}>
      <Checkbox size="large" checked={task.done} onClick={handleToggle} />
      <p className={classes.taskName}>{task.name}</p>
      <Button icon={<DeleteRegular />} appearance="subtle" onClick={handleDelete} className={classes.deleteButton} />
    </li>
  );
}

export default Task;
