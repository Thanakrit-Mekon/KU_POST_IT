import { makeStyles, createStyles } from '@material-ui/core/styles';
import InforFrom from '../components/EditPost/InforFrom';

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

function Postinfor(): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <InforFrom />
    </div>
  );
}

export default Postinfor;