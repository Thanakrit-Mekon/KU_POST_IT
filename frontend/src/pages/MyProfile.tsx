import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import StudentProfileForm from "../components/MyProfile/StudentProfileForm";
import TeacherProfileForm from "../components/MyProfile/TeacherProfileForm";
import CompanyProfileForm from "../components/MyProfile/CompanyProfileForm";
import ProfileImage from "../components/MyProfile/ProfileImage";
import NavBar from "../components/NavBar";
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

export interface MyProfileProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

function MyProfile({ user, setUser }: MyProfileProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <NavBar user={user} setUser={setUser} />
      <Grid container className={classes.row}></Grid>
      <Grid container className={classes.row}>
        <Grid item sm={1} />
        <Grid item sm={10}>
          <Typography align="left" variant="h4" color="primary">
            <Box mt={6} fontWeight="fontWeightBold">
              My Profile
            </Box>
          </Typography>
        </Grid>
        <Grid item sm={1} />
      </Grid>
      <Grid container>
        <Grid item sm={1} />
        <Grid item sm={2}>
          <Box pr={7}>
            <ProfileImage />
          </Box>
        </Grid>
        <Grid item sm={6}>
          <Box px={5}>
            {user?.location ? (
              <CompanyProfileForm user={user} />
            ) : user?.student_id ? (
              <StudentProfileForm user={user} />
            ) : (
              <TeacherProfileForm user={user} />
            )}
          </Box>
        </Grid>
        <Grid item sm={2} />
      </Grid>
      <Grid container className={classes.row}></Grid>
    </div>
  );
}

export default MyProfile;
