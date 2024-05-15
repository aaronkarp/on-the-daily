import { TasksProvider } from './contexts/TasksContext';
import { FluentProvider, makeStyles, tokens, webLightTheme } from '@fluentui/react-components';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import UserSelector from './components/UserSelector';
import ListPanel from './components/ListPanel';

const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground3,
    width: '100vw',
    height: '100vh'
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between'
  }
});

export default function App() {
  const classes = useStyles();
  return (
    <FluentProvider theme={webLightTheme}>
      <TasksProvider>
        <div className={classes.root}>
          <Header />
          <div className={classes.main}>
            <main>
              <ListPanel />
            </main>
            <UserSelector />
          </div>
          <AddTaskForm />
        </div>
      </TasksProvider>
    </FluentProvider>
  );
}
