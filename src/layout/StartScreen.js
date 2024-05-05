function StartScreen({ users }) {
  return (
    <div className="start-screen">
      <h2>{users.length > 0 ? 'Select a user to get started' : 'Add a user to get started'}</h2>
    </div>
  );
}

export default StartScreen;
