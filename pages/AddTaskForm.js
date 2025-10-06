import { useId, useState } from 'react';
import { useTasks } from '../src/contexts/TasksContext';
import {
  Button,
  Input,
  Label,
  makeStyles,
  tokens,
  shorthands,
} from '@fluentui/react-components';
import { TaskListSquareAddRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  footer: {
    gridColumnStart: 1,
    gridColumnEnd: 3,
    gridRowStart: 3,
    gridRowEnd: 4,
    color: tokens.colorNeutralForeground1,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow4,
    borderRadius: tokens.borderRadiusLarge,
    ...shorthands.margin(tokens.spacingVerticalM, tokens.spacingHorizontalL),
  },
  form: {
    ...shorthands.margin(tokens.spacingVerticalL, tokens.spacingHorizontalL),
  },
  formContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    gap: tokens.spacingHorizontalL,
    alignItems: 'center',
    justifyContent: 'space-between',
    ...shorthands.margin(0, 'auto'),
  },
  input: {
    flexGrow: 2,
  },
});

function AddTaskForm() {
  const { currentUser, addTask } = useTasks();
  const [newTask, setNewTask] = useState('');

  function handleSubmit(e) {
    if (newTask === '') {
      return;
    }
    e.preventDefault();
    const newId = crypto.randomUUID();
    const task = {
      id: newId,
      name: newTask,
      done: false,
    };
    addTask(task);
    resetForm();
  }

  function resetForm() {
    setNewTask('');
  }

  const inputId = useId('input');
  const classes = useStyles();

  return Object.keys(currentUser).length > 0 ? (
    <footer className={classes.footer}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.formContainer}>
          <Label htmlFor={inputId} size="large" required>
            Task description
          </Label>
          <Input
            className={classes.input}
            id={inputId}
            size="large"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            aria-required
            required
          />
          <Button
            appearance="primary"
            size="large"
            onClick={handleSubmit}
            icon={<TaskListSquareAddRegular />}
          >
            Add task
          </Button>
        </div>
      </form>
    </footer>
  ) : (
    ''
  );
}

export default AddTaskForm;
