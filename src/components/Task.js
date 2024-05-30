import { Card } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';

function Task({ task }) {
  const { toggleTask, deleteTask } = useTasks();

  function handleToggle() {
    toggleTask(task.id);
  }

  function handleDelete(e) {
    e.preventDefault();
    deleteTask(task.id);
  }

  return (
    <li>
      <Card>
        <input type="checkbox" checked={task.done} onClick={handleToggle} />
        <p>{task.name}</p>
        <button onClick={handleDelete}>❌</button>
      </Card>
    </li>
  );
}

export default Task;
