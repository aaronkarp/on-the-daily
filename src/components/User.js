import { makeStyles, tokens, shorthands, Avatar, Button, mergeClasses } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import { CheckboxChecked20Regular, CheckboxUnchecked20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  button: {
    border: 'none',
    borderRadius: 0,
    width: '100%',
    gap: tokens.spacingHorizontalL,
    justifyContent: 'flex-start',
    ...shorthands.padding(tokens.spacingVerticalL, tokens.spacingHorizontalL)
  },
  active: {
    backgroundColor: tokens.colorSubtleBackgroundSelected
  },
  flexRow: {
    display: 'flex',
    alignItems: 'center'
  },
  leftPara: {
    margin: 0,
    textAlign: 'left'
  },
  name: {
    fontSize: tokens.fontSizeBase500
  },
  secondaryText: {
    justifyContent: 'flex-start',
    gap: tokens.spacingHorizontalMNudge,
    marginLeft: tokens.spacingHorizontalS,
    marginTop: tokens.spacingVerticalXS
  },
  taskCount: {
    fontSize: tokens.fontSizeBase200,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3
  }
});

function User({ user }) {
  const { currentUser, selectUser, deleteUser } = useTasks();
  const classes = useStyles();

  const undoneTasks = user.tasks.filter((task) => task.done !== true);
  const doneTasks = user.tasks.filter((task) => task.done);

  function handleAlterUser(e, mode) {
    e.preventDefault();
    if (mode === 'select') selectUser(user);
    if (mode === 'delete') deleteUser(user.id);
  }

  return (
    <li>
      <Button
        onClick={(e) => handleAlterUser(e, 'select')}
        className={
          user.id === currentUser.id
            ? mergeClasses(classes.button, classes.active, classes.flexRow)
            : mergeClasses(classes.button, classes.flexRow)
        }
      >
        <Avatar
          active={user.id === currentUser.id ? 'active' : 'inactive'}
          activeAppearance="ring"
          size={64}
          name={user.name}
          image={{
            src: user.image
          }}
        />
        <div>
          <p className={mergeClasses(classes.name, classes.leftPara)}>{user.name}</p>
          <div className={mergeClasses(classes.secondaryText, classes.flexRow)}>
            <p className={mergeClasses(classes.taskCount, classes.leftPara, classes.flexRow)}>
              <CheckboxUnchecked20Regular /> {undoneTasks.length}
            </p>
            <p className={mergeClasses(classes.taskCount, classes.leftPara, classes.flexRow)}>
              <CheckboxChecked20Regular /> {doneTasks.length}
            </p>
          </div>
        </div>
      </Button>
      <Button onClick={(e) => handleAlterUser(e, 'delete')}>❌</Button>
    </li>
  );
}

export default User;
