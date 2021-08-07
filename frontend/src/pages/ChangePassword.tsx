import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import NavBar from '../components/NavBar';

import ChangePasswordForm from "../components/ChangePassword/ChangePasswordForm";
import PasswordRequirement from "../components/ChangePassword/PasswordRequirement";
import { User } from "../App";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
    },
    row: {
      flexGrow: 1,
    },
    bgTeal: {
      backgroundColor: "#5E9EA0",
    },
    fullHeight: {
      height: "100%",
    },
  })
);

export interface ChangePasswordProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

function ChangePassword({ user, setUser }: ChangePasswordProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar user={user} setUser={setUser}/>
      <Grid container className={classes.row}>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item sm={1}/>
        <Grid item sm={10}>
          <Typography
            align="left"
            variant="h4"
            color="primary"
          >
            <Box mt={6} mb={3} fontWeight="fontWeightBold">Change Password</Box>
          </Typography>
          <Typography
              align="left"
              variant="h6"
          >
            <Box mt={3} ml={4} fontWeight="fontWeightBold">New Password must contain :</Box>
          </Typography>
        </Grid>
        <Grid item sm={1}/>
      </Grid>
      <Grid container>
        <Grid item sm={1} />
        <Grid item sm={3} style={{paddingLeft:25}}>
            <PasswordRequirement />
            {/* <Box pr={7}>
                <ProfileImage />
            </Box> */}
        </Grid>
        <Grid item sm={5}>
          <Box mt={3}>
          <ChangePasswordForm />
          </Box>
        </Grid>
        <Grid item sm={2}/>
      </Grid>
      <Grid container className={classes.row}>
      </Grid>
    </div>
  );
}

export default ChangePassword;
