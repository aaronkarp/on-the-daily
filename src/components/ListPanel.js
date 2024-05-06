import { useTasks } from '../contexts/TasksContext';
import CompletedTaskList from './CompletedTaskList';
import StartScreen from './StartScreen';
import TaskList from './TaskList';

function ListPanel() {
  const { currentUser } = useTasks();
  if (Object.keys(currentUser).length > 0) {
    return (
      <>
        <TaskList />
        <CompletedTaskList />
      </>
    );
  } else {
    return <StartScreen />;
  }
}

export default ListPanel;
