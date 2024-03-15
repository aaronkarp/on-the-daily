import { useState } from 'react';

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);

  function handleSelectUser(e, user) {
    e.preventDefault();
    setCurrentUser(user);
  }

  function handleAddUser(e, name, image) {
    e.preventDefault();
    const newUser = {
      id: crypto.randomUUID(),
      name,
      image,
      tasks: []
    };

    setUsers((users) => [...users, newUser]);
    handleToggleAddUserForm();
  }

  function handleDeleteUser(e, id) {
    e.preventDefault();
    setUsers((users) => users.filter((user) => user.id !== id));
    if (currentUser.id === id) setCurrentUser(null);
  }

  function handleToggleAddUserForm() {
    setShowAddUserForm((show) => !show);
  }

  function handleAddTask(e, task) {
    e.preventDefault();
    const newTask = {
      id: crypto.randomUUID(),
      name: task,
      done: false
    };
    setUsers((users) =>
      users.map((user) => (user?.id === currentUser?.id ? { ...user, tasks: [...user.tasks, newTask] } : user))
    );
  }

  function handleToggleTask(taskId) {
    const tasks = users.find((user) => user.id === currentUser.id).tasks;
    const toggledTasks = tasks.map((task) => (task.id === taskId ? { ...task, done: !task.done } : task));
    setUsers((users) => users.map((user) => (user?.id === currentUser?.id ? { ...user, tasks: toggledTasks } : user)));
  }

  function handleDeleteTask(e, taskId) {
    e.preventDefault();
    const tasks = users.find((user) => user.id === currentUser.id).tasks;
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setUsers((users) => users.map((user) => (user?.id === currentUser?.id ? { ...user, tasks: newTasks } : user)));
  }

  return (
    <div className="App">
      <AddUserForm
        showAddUserForm={showAddUserForm}
        onAddUser={handleAddUser}
        onToggleAddUserForm={handleToggleAddUserForm}
      />
      <Header currentUser={currentUser} />
      <main>
        {currentUser ? (
          <>
            <TaskList
              users={users}
              currentUser={currentUser}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
            <CompletedTaskList
              users={users}
              currentUser={currentUser}
              onToggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
            />
          </>
        ) : (
          <StartScreen users={users} />
        )}
      </main>
      <UserSelector
        users={users}
        currentUser={currentUser}
        onSelectUser={handleSelectUser}
        onToggleAddUserForm={handleToggleAddUserForm}
        onDeleteUser={handleDeleteUser}
      />
      <AddTaskForm currentUser={currentUser} onAddTask={handleAddTask} />
    </div>
  );
}

function AddUserForm({ showAddUserForm, onAddUser, onToggleAddUserForm }) {
  const [newUserName, setNewUserName] = useState('');
  const [newUserImage, setNewUserImage] = useState('');

  return (
    <div className={`modal ${showAddUserForm ? '' : 'hidden'}`}>
      <div className="modal-shadow"></div>
      <div className="modal-container">
        <div className="modal-window">
          <form onSubmit={(e) => onAddUser(e, newUserName, newUserImage)}>
            <div>
              <label htmlFor="new-user-name">Name:</label>
              <input
                type="text"
                id="new-user-name"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="new-user-image">Image URL:</label>
              <input
                type="text"
                id="new-user-image"
                value={newUserImage}
                onChange={(e) => setNewUserImage(e.target.value)}
              />
            </div>

            <div>
              <button>Add User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function Header({ currentUser }) {
  return (
    <header>
      <h1>{currentUser ? `${currentUser.name}'s Tasks` : 'On the Daily'}</h1>
    </header>
  );
}

function StartScreen({ users }) {
  return (
    <div className="start-screen">
      <h2>{users.length > 0 ? 'Select a user to get started' : 'Add a user to get started'}</h2>
    </div>
  );
}

function TaskList({ users, currentUser, onToggleTask, onDeleteTask }) {
  const tasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => !task.done);
  return (
    <div className="task-list">
      <h2>To Do</h2>
      <ul className="task-list-container">
        {tasks?.length > 0
          ? tasks.map((task) =>
              !task.done ? (
                <Task task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} key={task.id} />
              ) : (
                ''
              )
            )
          : ''}
      </ul>
    </div>
  );
}

function CompletedTaskList({ users, currentUser, onToggleTask, onDeleteTask }) {
  const completedTasks = users.find((user) => user.id === currentUser.id).tasks?.filter((task) => task.done);
  return (
    <div className="completed-task-list">
      <h2>Done</h2>
      <ul className="completed-task-list-container">
        {completedTasks?.length > 0
          ? completedTasks.map((task) =>
              task.done ? (
                <Task task={task} onToggleTask={onToggleTask} onDeleteTask={onDeleteTask} key={task.id} />
              ) : (
                ''
              )
            )
          : ''}
      </ul>
    </div>
  );
}

function Task({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="task-list-item">
      <input type="checkbox" className="task-check" checked={task.done} onClick={() => onToggleTask(task.id)} />
      <p className="task-name">{task.name}</p>
      <button className="task-list-item-delete" onClick={(e) => onDeleteTask(e, task.id)}>
        ❌
      </button>
    </li>
  );
}

function UserSelector({ users, currentUser, onSelectUser, onToggleAddUserForm, onDeleteUser }) {
  return (
    <div className="user-selector">
      <ul className="user-list">
        {users.map((user) => (
          <User
            user={user}
            currentUser={currentUser}
            onSelectUser={onSelectUser}
            onDeleteUser={onDeleteUser}
            key={user.id}
          />
        ))}
      </ul>
      <div className="add-user-button">
        <button onClick={onToggleAddUserForm}>Add User</button>
      </div>
    </div>
  );
}

function User({ user, currentUser, onSelectUser, onDeleteUser }) {
  return (
    <li className={`user-list-item ${user?.id === currentUser?.id ? 'active' : ''}`}>
      <button className="user-list-item-button" onClick={(e) => onSelectUser(e, user)}>
        <img src={user.image} alt={user.name} className="user-list-avatar" />
        <span>{user.name}</span>
      </button>
      <button className="user-list-item-delete" onClick={(e) => onDeleteUser(e, user.id)}>
        ❌
      </button>
    </li>
  );
}

function AddTaskForm({ currentUser, onAddTask }) {
  const [newTask, setNewTask] = useState('');
  return (
    <footer>
      {currentUser ? (
        <form onSubmit={(e) => onAddTask(e, newTask)}>
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
