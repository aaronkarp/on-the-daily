import { useTasks } from '../contexts/TasksContext';

function Header() {
  const { currentUser } = useTasks();
  return (
    <header>
      <h1>{Object.keys(currentUser).length > 0 ? `${currentUser.name}'s Tasks` : 'On the Daily'}</h1>
    </header>
  );
}

export default Header;
