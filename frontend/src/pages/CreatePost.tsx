import { Box, Button, ButtonGroup, Container, createStyles, Grid, makeStyles } from '@material-ui/core';
import PostForm from '../components/PostForm';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      flexGrow: 1,
    },
    fullHeight: {
      height: '100%',
    },
  })
);

function CreatePost(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.row}>
        <Grid item sm={1} md={2} />
        <Grid item xs={10} md={8}>
          <Grid container className={classes.fullHeight}>
            <Grid item xs={7} />
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <PostForm />
        </Grid>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={1} md={2} />
        <Grid item xs={10} md={8}>
          <Grid container className={classes.fullHeight}>
            <Grid item xs={7} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default CreatePost;