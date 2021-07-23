import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Detail from './Detial';
import { Button, ButtonGroup } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 10)]: {
      width: 600,
      margin: 'auto'
    },
  },
  paper: {
    width: 600,
    height: 600,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    alignContent: 'center',
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start'
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PostForm() {

  const classes = useStyles();

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" color="primary">
              Create Post
            </Typography>
            <div className={classes.buttons}>
              <Button variant="contained" color="primary" href="#contained-buttons" className={classes.button}>
                Post
              </Button>
              <Button variant="outlined" color="secondary" aria-label="outlined secondary button group" className={classes.button}>
                Cancel
              </Button>
            </div>
          <Detail />
        </Paper>
      </main>
    </React.Fragment>
  );
}