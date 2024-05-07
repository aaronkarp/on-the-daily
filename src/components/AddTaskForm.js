import { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';
import { Button, Input, Label } from '@fluentui/react-components';

function AddTaskForm() {
  const { currentUser, addTask } = useTasks();
  const [newTask, setNewTask] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const newId = crypto.randomUUID();
    const task = {
      id: newId,
      name: newTask,
      done: false
    };
    addTask(task);
    resetForm();
  }

  function resetForm() {
    setNewTask('');
  }

  return (
    <footer>
      {currentUser ? (
        <form onSubmit={handleSubmit}>
          <Label for="newTask">Task description</Label>
          <Input id="newTask" size="large" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          <Button appearance="primary" size="large" onClick={handleSubmit}>
            Add task
          </Button>
        </form>
      ) : (
        ''
      )}
    </footer>
  );
}

export default AddTaskForm;
