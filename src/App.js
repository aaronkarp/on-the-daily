import { TasksProvider } from './contexts/TasksContext';
import AddUserForm from './components/AddUserForm';
import AddTaskForm from './components/AddTaskForm';
import Header from './components/Header';
import UserSelector from './components/UserSelector';
import ListPanel from './components/ListPanel';

export default function App() {
  return (
    <TasksProvider>
      <div className="App">
        <AddUserForm />
        <Header />
        <main>
          <ListPanel />
        </main>
        <UserSelector />
        <AddTaskForm />
      </div>
    </TasksProvider>
  );
}
