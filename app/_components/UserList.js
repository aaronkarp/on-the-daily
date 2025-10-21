import { makeStyles, shorthands, tokens } from '@fluentui/react-components';
import { useTasks } from '../../src/contexts/TasksContext';
import User from './User';

const useStyles = makeStyles({
  list: {
    listStyleType: 'none',
    padding: 0,
    width: '100%',
    ...shorthands.margin(tokens.spacingVerticalL, 0),
  },
});
function UserList() {
  const { users } = useTasks();
  const classes = useStyles();

  return (
    <ul className={classes.list}>
      {users.map((user) => (
        <User user={user} key={user.id} />
      ))}
    </ul>
  );
}

export default UserList;
