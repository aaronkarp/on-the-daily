import { makeStyles } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import CompletedTaskList from './CompletedTaskList';
import StartScreen from './StartScreen';
import TaskList from './TaskList';

const useStyles = makeStyles({
  mainPanel: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 3
  }
});

function ListPanel() {
  const { currentUser } = useTasks();
  const classes = useStyles();
  if (Object.keys(currentUser).length > 0) {
    return (
      <div className={classes.mainPanel}>
        <TaskList />
        <CompletedTaskList />
      </div>
    );
  } else {
    return <StartScreen className={classes.mainPanel} />;
  }
}

export default ListPanel;
