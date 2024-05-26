import {
  makeStyles,
  tokens,
  shorthands,
  Avatar,
  Button,
  mergeClasses,
  Tooltip,
  Dialog,
  DialogSurface,
  Tag,
  Menu,
  MenuPopover,
  MenuTrigger,
  MenuList,
  MenuItem,
  useRestoreFocusTarget
} from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';
import {
  CheckboxChecked20Regular,
  CheckboxUnchecked20Regular,
  DeleteRegular,
  MoreHorizontalRegular,
  PersonEditRegular
} from '@fluentui/react-icons';
import ConfirmDeleteUser from './ConfirmDeleteUser';
import UpdateUserForm from './UpdateUserForm';
import { useState } from 'react';

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
    backgroundColor: tokens.colorBrandBackgroundInvertedSelected
  },
  flex: {
    display: 'flex'
  },
  flexRow: {
    flexDirection: 'row'
  },
  flexCol: {
    flexDirection: 'column'
  },
  flexAlignCenter: {
    alignItems: 'center'
  },
  flexAlignStretch: {
    alignItems: 'stretch'
  },
  flexJustifyStart: {
    justifyContent: 'flex-start'
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
    gap: tokens.spacingHorizontalMNudge
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
  },
  menuNoPad: {
    padding: 0
  },
  tag: {
    marginTop: tokens.spacingVerticalS
  }
});

function User({ user }) {
  const { currentUser, selectUser } = useTasks();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const restoreFocusTargetAttribute = useRestoreFocusTarget();
  const classes = useStyles();

  const undoneTasks = user.tasks.filter((task) => task.done !== true);
  const doneTasks = user.tasks.filter((task) => task.done);

  function handleSelect(e) {
    e.preventDefault();
    selectUser(user);
  }

  function handleDialog(e, dialog) {
    if (dialog === 'edit') setEditOpen(true);
    if (dialog === 'delete') setDeleteOpen(true);
  }

  return (
    <li className={classes.listItem}>
      <Button
        appearance="subtle"
        onClick={handleSelect}
        className={
          user.id === currentUser.id
            ? mergeClasses(classes.button, classes.active, classes.flex, classes.flexRow, classes.flexAlignCenter)
            : mergeClasses(classes.button, classes.flex, classes.flexRow, classes.flexAlignCenter)
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
          <Tag shape="circular" appearance="brand" className={classes.tag}>
            <div
              className={mergeClasses(classes.secondaryText, classes.flex, classes.flexRow, classes.flexAlignCenter)}
            >
              <p
                className={mergeClasses(
                  classes.taskCount,
                  classes.leftPara,
                  classes.flex,
                  classes.flexRow,
                  classes.flexAlignCenter
                )}
              >
                <CheckboxUnchecked20Regular /> {undoneTasks.length}
              </p>
              <p
                className={mergeClasses(
                  classes.taskCount,
                  classes.leftPara,
                  classes.flex,
                  classes.flexRow,
                  classes.flexAlignCenter
                )}
              >
                <CheckboxChecked20Regular /> {doneTasks.length}
              </p>
            </div>
          </Tag>
        </div>
      </Button>
      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <Tooltip content="User settings">
            <Button appearance="subtle" icon={<MoreHorizontalRegular />} className={classes.menuButton} />
          </Tooltip>
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            <MenuItem
              {...restoreFocusTargetAttribute}
              icon={<PersonEditRegular />}
              onClick={(e) => handleDialog(e, 'edit')}
            >
              Edit user
            </MenuItem>
            <MenuItem
              {...restoreFocusTargetAttribute}
              icon={<DeleteRegular />}
              onClick={(e) => handleDialog(e, 'delete')}
            >
              Delete user
            </MenuItem>
          </MenuList>
        </MenuPopover>
      </Menu>
      <Dialog
        open={editOpen}
        onOpenChange={(event, data) => {
          setEditOpen(data.open);
        }}
      >
        <DialogSurface>
          <UpdateUserForm mode="edit-user" user={user} />
        </DialogSurface>
      </Dialog>
      <Dialog
        open={deleteOpen}
        onOpenChange={(event, data) => {
          setDeleteOpen(data.open);
        }}
        modalType="alert"
      >
        <DialogSurface>
          <ConfirmDeleteUser user={user} />
        </DialogSurface>
      </Dialog>
    </li>
  );
}

export default User;
