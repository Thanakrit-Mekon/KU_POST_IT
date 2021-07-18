import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Typography, Box } from "@material-ui/core";
import ProfileForm from "../components/MyProfile/ProfileForm";
import ProfileImage from "../components/MyProfile/ProfileImage";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
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

function MyProfile(): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container className={classes.row}>
      </Grid>
      <Grid container className={classes.row}>
        <Grid item xs={1}/>
        <Grid item xs={10}>
          <Typography
            align="left"
            variant="h4"
            color="primary"
            style={{ paddingBottom: "1rem" }}
          >
            <Box fontWeight="fontWeightBold">Information</Box>
          </Typography>
        </Grid>
        <Grid item xs={1}/>
      </Grid>
      <Grid container>
        <Grid item sm={1} md={2} />
        <Grid item sm={3} md={2}>
          <ProfileImage />
        </Grid>
        <Grid item sm={7} md={6}>
          <Box px={5}>
          <ProfileForm />
          </Box>
        </Grid>
        <Grid item sm={1} md={2}/>
      </Grid>
    </div>
  );
}

export default MyProfile;
