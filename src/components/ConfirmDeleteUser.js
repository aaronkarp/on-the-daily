import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';

function ConfirmDeleteUser({ user }) {
  const { deleteUser } = useTasks();

  function handleDelete(e) {
    e.preventDefault();
    deleteUser(user.id);
  }

  return (
    <DialogBody>
      <DialogTitle>Delete user</DialogTitle>
      <DialogContent>Delete this user and all of their tasks? This action cannot be undone.</DialogContent>
      <DialogActions>
        <DialogTrigger disableButtonEnhancement>
          <Button appearance="secondary">Cancel</Button>
        </DialogTrigger>
        <Button appearance="primary" onClick={handleDelete}>
          Delete user
        </Button>
      </DialogActions>
    </DialogBody>
  );
}

export default ConfirmDeleteUser;
