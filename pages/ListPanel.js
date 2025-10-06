import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { useTasks } from '../src/contexts/TasksContext';
import StartScreen from './StartScreen';
import TaskList from './TaskList';

const useStyles = makeStyles({
  mainPanel: {
    maxHeight: '100%',
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 2,
    gridRowEnd: 3,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow,
  },
  startPanel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '100%',
    gridRowEnd: 4,
  },
});

function ListPanel() {
  const { currentUser } = useTasks();
  const classes = useStyles();
  if (Object.keys(currentUser).length > 0) {
    return (
      <div className={classes.mainPanel}>
        <TaskList variant="incomplete" />
        <TaskList variant="complete" />
      </div>
    );
  } else {
    return (
      <div className={mergeClasses(classes.mainPanel, classes.startPanel)}>
        <StartScreen />
      </div>
    );
  }
}

export default ListPanel;
