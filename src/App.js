import { TasksProvider } from './contexts/TasksContext';
import { FluentProvider, makeStyles, tokens, webLightTheme } from '@fluentui/react-components';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import UserSelector from './components/UserSelector';
import ListPanel from './components/ListPanel';

const useStyles = makeStyles({
  gridContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr',
    gridTemplateRows: '0.5fr 8fr 1fr'
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <TasksProvider>
        <div className={classes.gridContainer}>
          <Header />
          <ListPanel />
          <UserSelector />
          <AddTaskForm />
        </div>
      </TasksProvider>
    </FluentProvider>
  );
}
