import { makeStyles, createStyles } from '@material-ui/core/styles';
import PostForm from '../components/CreatePost/PostForm';

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#5E9EA0',
    },
  })
);

function CreatePost(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <PostForm />
    </div>
  );
}

export default CreatePost;
