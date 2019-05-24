import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import styles from './index.module.scss'
import Fab from '@material-ui/core/Fab';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

function ButtonSizes({execute}) {
  const classes = useStyles();
  const date = new Date();
  const day = date.getDate()
  const color = day % 2 === 0 ? "primary" : "secondary"
  return (
    <Fab size="large" onClick={execute} color={color} aria-label="转" className={`${classes.margin}`}>
      转
    </Fab>
  );
}

export default ButtonSizes;
