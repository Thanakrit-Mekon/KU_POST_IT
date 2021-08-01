import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
<<<<<<< HEAD
import { Button } from '@material-ui/core';
import Detail from './Detial';
=======
import FormCreatePost from './FormCreatePost';
>>>>>>> main

const useStyles = makeStyles((theme) => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 10)]: {
      width: 600,
      margin: 'auto',
    },
  },
  paper: {
    width: 600,
<<<<<<< HEAD
    height: 600,
=======
    height: 'auto',
>>>>>>> main
    padding: theme.spacing(2),
    alignContent: 'center',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function PostForm(): JSX.Element {
  const classes = useStyles();

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
<<<<<<< HEAD
          <Typography component="h1" variant="h4" color="primary">
            Create Post
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              href="#contained-buttons"
              className={classes.button}>
              Post
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              aria-label="outlined secondary button group"
              className={classes.button}>
              Cancel
            </Button>
          </div>
          <Detail />
=======
          <FormCreatePost/>
>>>>>>> main
        </Paper>
      </main>
    </>
  );
}
