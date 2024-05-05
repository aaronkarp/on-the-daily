import { createContext, useContext, useReducer } from 'react';

const ListsContext = createContext();

const initialState = {
  users: [],
  currentUser: {},
  showAddUserForm: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'form/toggle':
      return {
        ...state,
        showAddUserForm: !state.showAddUserForm
      };
    case 'user/add':
      return {
        ...state,
        users: [...state.users, action.payload],
        showAddUserForm: false,
        currentUser: action.payload
      };
    case 'user/delete':
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        currentUser: {}
      };
    case 'user/select':
      return {
        ...state,
        currentUser: action.payload
      };
    case 'task/add':
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === state.currentUser.id ? { ...user, tasks: [...user.tasks, action.payload] } : { ...user }
        )
      };
    case 'task/toggle':
      return {};
    case 'task/delete':
      return {};
    default:
      throw new Error('Unknown action');
  }
}

function TasksProvider({ children }) {
  const [{ users, currentUser, showAddUserForm }, dispatch] = useReducer(reducer, initialState);

  function toggleForm() {
    dispatch({ type: 'form/toggle' });
  }

  function addUser(user) {
    dispatch({ type: 'user/add', payload: user });
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
    dispatch({ type: 'task/toggle', payload: id });
  }

  function deleteTask(id) {
    dispatch({ type: 'task/delete', payload: id });
  }

  return (
    <ListsContext.Provider
      value={{
        users,
        currentUser,
        showAddUserForm,
        toggleForm,
        addUser,
        selectUser,
        deleteUser,
        addTask,
        toggleTask,
        deleteTask
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) throw new Error('TasksContext was used outside the TasksProvider');
  return context;
}

export { TasksProvider, useTasks };
