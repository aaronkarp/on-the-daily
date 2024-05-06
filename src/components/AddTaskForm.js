import { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';

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
          <input
            type="text"
            placeholder="Task description"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button>Add Task</button>
        </form>
      ) : (
        ''
      )}
    </footer>
  );
}

export default AddTaskForm;
