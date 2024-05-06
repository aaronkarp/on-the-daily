import { useTasks } from '../contexts/TasksContext';
import User from './User';

function UserSelector() {
  const { users, toggleForm } = useTasks();

  return (
    <div className="user-selector">
      <ul className="user-list">
        {users.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </ul>
      <div className="add-user-button">
        <button onClick={() => toggleForm(true)}>Add User</button>
      </div>
    </div>
  );
}

export default UserSelector;
