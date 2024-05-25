import {
  makeStyles,
  tokens,
  shorthands,
  Avatar,
  Button,
  mergeClasses,
  Popover,
  PopoverTrigger,
  PopoverSurface,
  Tooltip
} from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import { CheckboxCheckedRegular, CheckboxUncheckedRegular, MoreHorizontalRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  listItem: {
    position: 'relative'
  },
  button: {
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
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightRegular,
    color: tokens.colorNeutralForeground3
  },
  menuButton: {
    position: 'absolute',
    right: tokens.spacingHorizontalS,
    top: tokens.spacingVerticalS
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
    <li className={classes.listItem}>
      <Button
        appearance="subtle"
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
              <CheckboxUncheckedRegular /> {undoneTasks.length}
            </p>
            <p className={mergeClasses(classes.taskCount, classes.leftPara, classes.flexRow)}>
              <CheckboxCheckedRegular /> {doneTasks.length}
            </p>
          </div>
        </div>
      </Button>
      <Popover>
        <PopoverTrigger disableButtonEnhancement>
          <Tooltip content="User settings">
            <Button appearance="subtle" icon={<MoreHorizontalRegular />} className={classes.menuButton} />
          </Tooltip>
        </PopoverTrigger>
        <PopoverSurface tabIndex={-1}>User Settings Menu</PopoverSurface>
      </Popover>
    </li>
  );
}

export default User;
