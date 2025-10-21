import {
  Button,
  Dialog,
  DialogTrigger,
  DialogSurface,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { useTasks } from '../../src/contexts/TasksContext';
import { PersonAddRegular } from '@fluentui/react-icons';
import UserList from './UserList';
import UpdateUserForm from './UpdateUserForm';

const useStyles = makeStyles({
  panel: {
    backgroundColor: tokens.colorNeutralBackground1,
    width: '100%',
    grow: 0,
    boxShadow: tokens.shadow4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gridColumnStart: 3,
    gridColumnEnd: 4,
    gridRowStart: 2,
    gridRowEnd: 4,
  },
});

function UserSelector() {
  const { users } = useTasks();

  const classes = useStyles();

  return (
    <div className={classes.panel}>
      {users.length > 0 && <UserList />}
      <div>
        <Dialog>
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance="primary"
              size="large"
              icon={<PersonAddRegular />}
            >
              Add user
            </Button>
          </DialogTrigger>
          <DialogSurface>
            <UpdateUserForm mode="add-user" />
          </DialogSurface>
        </Dialog>
      </div>
    </div>
  );
}

export default UserSelector;
