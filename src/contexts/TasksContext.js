import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext();

const initialState = {
  users: [],
  currentUser: {}
};

function reducer(state, action) {
  switch (action.type) {
    case 'user/add':
      return {
        ...state,
        users: [...state.users, action.payload],
        currentUser: action.payload.id
      };
    case 'user/edit':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, name: action.payload.name, image: action.payload.image }
            : { ...user }
        )
      };
    case 'user/delete':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        currentUser: ''
      };
    case 'user/select':
      return {
        ...state,
        currentUser: { ...action.payload }
      };
    case 'task/add':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === state.currentUser.id ? { ...user, tasks: [...user.tasks, action.payload] } : { ...user }
        )
      };
    case 'task/toggle':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === state.currentUser.id ? { ...user, tasks: [...action.payload] } : { ...user }
        )
      };
    case 'task/delete':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === state.currentUser.id
            ? { ...user, tasks: user.tasks.filter((task) => task.id !== action.payload) }
            : { ...user }
        )
      };
    default:
      throw new Error('Unknown action');
  }
}

function TasksProvider({ children }) {
  const [{ users, currentUser }, dispatch] = useReducer(reducer, initialState);

  function addUser(user) {
    dispatch({ type: 'user/add', payload: user });
  }

  function editUser(user) {
    dispatch({ type: 'user/edit', payload: user });
  }

  function selectUser(user) {
    dispatch({ type: 'user/select', payload: user });
  }

  function deleteUser(id) {
    dispatch({ type: 'user/delete', payload: id });
  }

  function addTask(task) {
    dispatch({ type: 'task/add', payload: task });
  }

  function toggleTask(id) {
    const user = users.find((user) => user.id === currentUser.id);
    const toggledTasks = user.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : { ...task }));
    dispatch({ type: 'task/toggle', payload: toggledTasks });
  }

  function deleteTask(id) {
    dispatch({ type: 'task/delete', payload: id });
  }

  return (
    <TasksContext.Provider
      value={{
        users,
        currentUser,
        addUser,
        editUser,
        selectUser,
        deleteUser,
        addTask,
        toggleTask,
        deleteTask
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) throw new Error('TasksContext was used outside the TasksProvider');
  return context;
}

export { TasksProvider, useTasks };
