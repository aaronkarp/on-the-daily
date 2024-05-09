import { TasksProvider } from './contexts/TasksContext';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import UserSelector from './components/UserSelector';
import ListPanel from './components/ListPanel';

export default function App() {
  return (
    <FluentProvider theme={webLightTheme}>
      <TasksProvider>
        <div className="App">
          <Header />
          <main>
            <ListPanel />
          </main>
          <UserSelector />
          <AddTaskForm />
        </div>
      </TasksProvider>
    </FluentProvider>
  );
}
