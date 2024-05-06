import { useTasks } from '../contexts/TasksContext';

function User({ user }) {
  const { currentUser, selectUser, deleteUser } = useTasks();

  function handleAlterUser(e, mode) {
    e.preventDefault();
    if (mode === 'select') selectUser(user);
    if (mode === 'delete') deleteUser(user.id);
  }

  return (
    <li className={`user-list-item ${user.id === currentUser?.id ? 'active' : ''}`}>
      <button className="user-list-item-button" onClick={(e) => handleAlterUser(e, 'select')}>
        <img src={user.image} alt={user.name} className="user-list-avatar" />
        <span>{user.name}</span>
      </button>
      <button className="user-list-item-delete" onClick={(e) => handleAlterUser(e, 'delete')}>
        ❌
      </button>
    </li>
  );
}

export default User;
