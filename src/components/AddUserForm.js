import { useState } from 'react';
import { useTasks } from '../contexts/TasksContext';

function AddUserForm() {
  const { showAddUserForm, toggleForm, addUser, selectUser } = useTasks();
  const [newUserName, setNewUserName] = useState('');
  const [newUserImage, setNewUserImage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const newId = crypto.randomUUID();
    const user = {
      id: newId,
      name: newUserName,
      image: newUserImage,
      tasks: []
    };
    addUser(user);
    selectUser(user);
    resetForm();
    toggleForm(false);
  }

  function resetForm() {
    setNewUserName('');
    setNewUserImage('');
  }

  return (
    <div className={`modal ${showAddUserForm ? '' : 'hidden'}`}>
      <div className="modal-shadow"></div>
      <div className="modal-container">
        <div className="modal-window">
          <form onSubmit={handleSubmit}>
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

export default AddUserForm;
