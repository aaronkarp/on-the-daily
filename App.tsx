import { TasksProvider } from './src/contexts/TasksContext';
import {
  FluentProvider,
  makeStyles,
  tokens,
  webLightTheme,
} from '@fluentui/react-components';
import AddTaskForm from './pages/AddTaskForm';
import Header from './pages/Header';
import UserSelector from './pages/UserSelector';
import ListPanel from './pages/ListPanel';

const useStyles = makeStyles({
  gridContainer: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: '100vw',
    height: '100vh',
    maxWidth: '100vw',
    maxHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '3fr 1fr 1fr',
    gridTemplateRows: '6.15dvh 82.56dvh 11.29dvh',
  },
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
