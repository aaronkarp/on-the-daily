import {
  Button,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Field,
  Input
} from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import { useState } from 'react';

function UpdateUserForm({ mode, user }) {
  const { addUser, editUser, selectUser } = useTasks();
  const [newUserName, setNewUserName] = useState(user?.name || '');
  const [newUserImage, setNewUserImage] = useState(user?.image || '');

  function handleSubmit(e) {
    e.preventDefault();
    if (newUserName === '' || newUserImage === '') return;
    const newId = mode === 'add-user' ? crypto.randomUUID() : user?.id;
    const newUser = {
      id: newId,
      name: newUserName,
      image: newUserImage,
      tasks: []
    };
    if (mode === 'add-user') addUser(newUser);
    if (mode === 'edit-user') editUser(newUser);
    selectUser(newUser);
    resetForm();
  }

  function resetForm() {
    setNewUserName('');
    setNewUserImage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <DialogBody>
        <DialogTitle>{mode === 'add-user' ? 'Add' : 'Edit'} user</DialogTitle>
        <DialogContent>
          <Field label="Name" required>
            <Input size="large" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} />
          </Field>
          <Field label="Image URL" required>
            <Input size="large" value={newUserImage} onChange={(e) => setNewUserImage(e.target.value)} />
          </Field>
        </DialogContent>
        <DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger disableButtonEnhancement>
            <Button type="submit" appearance="primary">
              {mode === 'add-user' ? 'Add' : 'Edit'} user
            </Button>
          </DialogTrigger>
        </DialogActions>
      </DialogBody>
    </form>
  );
}

export default UpdateUserForm;
