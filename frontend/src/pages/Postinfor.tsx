import { makeStyles, createStyles } from '@material-ui/core/styles';
import InforFrom from '../components/EditPost/InforFrom';
import { User } from "../App";

export interface postinforprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

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

function Postinfor({user}:postinforprops): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <InforFrom user={user} />
    </div>
  );
}

export default Postinfor;