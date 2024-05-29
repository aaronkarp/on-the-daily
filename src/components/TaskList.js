import { useTasks } from '../contexts/TasksContext';
import Task from './Task';

function TaskList({ variant }) {
  const { users, currentUser } = useTasks();
  let tasks;
  if (variant === 'incomplete')
    tasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => !task.done);
  if (variant === 'complete')
    tasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => task.done);
  return (
    <div>
      <h2>{variant === 'incomplete' ? 'To Do' : 'Done'}</h2>
      <ul>{tasks?.length > 0 ? tasks.map((task) => (!task.done ? <Task task={task} key={task.id} /> : '')) : ''}</ul>
    </div>
  );
}

export default TaskList;
