import { useTasks } from '../contexts/TasksContext';
import Task from './Task';

function TaskList() {
  const { users, currentUser } = useTasks();
  const tasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => !task.done);
  return (
    <div className="task-list">
      <h2>To Do</h2>
      <ul className="task-list-container">
        {tasks?.length > 0 ? tasks.map((task) => (!task.done ? <Task task={task} key={task.id} /> : '')) : ''}
      </ul>
    </div>
  );
}

export default TaskList;
