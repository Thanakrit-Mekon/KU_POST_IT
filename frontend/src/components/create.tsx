import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Grid, Box} from '@material-ui/core';
import Form from './Form';

const useStyles = makeStyles(() =>
  createStyles({
    bgTeal: {
      backgroundColor: '#5E9EA0',
    },
    bgWhite: {
      backgroundColor: 'white',
    },
    leftCol: {
      borderRadius: '4px 0 0 4px',
    },
    rightCol: {
      borderRadius: '0 4px 4px 0',
    },
    content: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      overflow: 'hidden',
      '& img': {
        width: '80%',
        objectFit: 'cover',
      },
    },
  })
);

function Create(): JSX.Element {
  const classes = useStyles();


  return (
      <Grid container>
        <Grid item sm={7} className={classes.bgWhite}>
          <Box
            borderRadius="4px 0 0 4px"
            boxShadow={4}
            className={classes.content}>
            <Form/>
          </Box>
        </Grid>
        <Grid item sm={5} className={classes.bgTeal}>
          <Box
            borderRadius="0 4px 4px 0"
            boxShadow={6}
            className={classes.content}>
            <img src="/img/mascot.png" alt="mascot" />
            <img src="/img/logo.png" alt="logo" />
          </Box>
        </Grid>
      </Grid>
  );
}

export default Create;