import { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';
import { Button, Field, Input, Label } from '@fluentui/react-components';
import { TaskListSquareAddRegular } from '@fluentui/react-icons';

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
      {Object.keys(currentUser).length > 0 ? (
        <form onSubmit={handleSubmit}>
          <Field label="Task description" size="large" orientation="horizontal">
            <Input value={newTask} onChange={(e) => setNewTask(e.target.value)} />
          </Field>
          <Button appearance="primary" size="large" onClick={handleSubmit} icon={<TaskListSquareAddRegular />}>
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
