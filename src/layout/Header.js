function Header({ currentUser }) {
  return (
    <header>
      <h1>{currentUser ? `${currentUser.name}'s Tasks` : 'On the Daily'}</h1>
    </header>
  );
}

export default Header;
