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
    <li className="task-list-item">
      <input type="checkbox" className="task-check" checked={task.done} onClick={handleToggle} />
      <p className="task-name">{task.name}</p>
      <button className="task-list-item-delete" onClick={handleDelete}>
        ❌
      </button>
    </li>
  );
}

export default Task;
