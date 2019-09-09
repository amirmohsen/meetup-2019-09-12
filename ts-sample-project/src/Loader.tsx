import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary
    }
  })
);

const Loader = props => {
  const classes = useStyles(props);

  return (
    <Paper className={classes.paper}>
      <CircularProgress className={classes.progress} />
    </Paper>
  );
};

export default Loader;
