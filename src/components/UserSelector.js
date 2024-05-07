import { Button } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import User from './User';
import { PersonAddRegular } from '@fluentui/react-icons';

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
        <Button appearance="primary" size="large" onClick={() => toggleForm(true)} icon={<PersonAddRegular />}>
          Add user
        </Button>
      </div>
    </div>
  );
}

export default UserSelector;
