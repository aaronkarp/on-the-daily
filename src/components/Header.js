import { makeStyles, tokens, shorthands } from '@fluentui/react-components';
import { useTasks } from '../contexts/TasksContext';

const useStyles = makeStyles({
  header: {
    background: `linear-gradient(to right, ${tokens.colorBrandBackgroundPressed}, 20%, ${tokens.colorBrandBackground})`,
    color: tokens.colorNeutralForegroundInverted,
    width: '100vw',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gridColumnStart: 1,
    gridColumnEnd: 4,
    gridRowStart: 1,
    gridRowEnd: 2,
  },
  headline: {
    ...shorthands.margin(tokens.spacingVerticalL, tokens.spacingHorizontalXL),
    fontWeight: tokens.fontWeightMedium,
    fontSize: tokens.fontSizeHero800,
  },
});

function Header() {
  const { currentUser } = useTasks();
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <h1 className={classes.headline}>
        {Object.keys(currentUser).length > 0
          ? `${currentUser.name}'s Tasks`
          : 'On the Daily'}
      </h1>
    </header>
  );
}

export default Header;
