import { makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { useTasks } from '../../src/contexts/TasksContext';

const useStyles = makeStyles({
  startScreen: {
    ...shorthands.margin(tokens.spacingVerticalL, tokens.spacingHorizontalXL),
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeHero800,
    color: tokens.colorNeutralForeground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

function StartScreen() {
  const { users } = useTasks();
  const classes = useStyles();
  return (
    <h2 className={classes.startScreen}>
      {users.length > 0
        ? 'Select a user to get started ▶'
        : 'Add a user to get started ▶'}
    </h2>
  );
}

export default StartScreen;
