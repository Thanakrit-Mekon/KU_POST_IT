import { Box, Button, ButtonGroup, Container, createStyles, makeStyles } from '@material-ui/core';
import PostForm from '../components/PostForm';

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      backgroundColor: '#F2F7F7',
      Maxheight:' 100vh',
      Height: '100%'
    },
  })
);

function CreatePost() : JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <PostForm />
    </div>
  )  
}

export default CreatePost