import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import Task from './Task';

const useStyles = makeStyles({
  title: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeHero900,
    marginTop: 0,
    lineHeight: 1
  },
  listContainer: {
    ...shorthands.padding(
      tokens.spacingVerticalL,
      tokens.spacingHorizontalXL,
      tokens.spacingVerticalL,
      tokens.spacingHorizontalL
    ),
    overflowY: 'auto'
  },
  list: {
    listStyleType: 'none',
    margin: 0,
    padding: 0
  }
});

function TaskList({ variant }) {
  const { users, currentUser } = useTasks();
  const classes = useStyles();
  let tasks;
  if (variant === 'incomplete')
    tasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => !task.done);
  if (variant === 'complete')
    tasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => task.done);
  return (
    <div className={classes.listContainer}>
      <h2 className={classes.title}>{variant === 'incomplete' ? 'To Do' : 'Done'}</h2>
      <ul className={classes.list}>
        {tasks?.length > 0 ? tasks.map((task) => <Task task={task} key={task.id} />) : ''}
      </ul>
    </div>
  );
}

export default TaskList;
