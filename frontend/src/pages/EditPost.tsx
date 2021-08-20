import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditForm from '../components/EditPost/EditForm';

const useStyles = makeStyles(() =>
  createStyles({
    bg: {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgb(241,241,241)',
    },
  })
);

function EreatePost(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <EditForm />
    </div>
  );
}

export default EreatePost;
