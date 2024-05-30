import { Card, Checkbox, makeStyles, tokens } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';

const useStyles = makeStyles({
  listItem: {
    marginBottom: tokens.spacingVerticalL
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
    <li className={classes.listItem}>
      <Card
        floatingAction={<Checkbox size="large" checked={task.done} onClick={handleToggle} />}
        selected={task.done}
        onSelectionChange={handleToggle}
      >
        <p>{task.name}</p>
        <button onClick={handleDelete}>❌</button>
      </Card>
    </li>
  );
}

export default Task;
