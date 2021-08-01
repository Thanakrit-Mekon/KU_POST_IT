import {
    Button,
    Box,
    Grid
  } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
  

  const useStyles = makeStyles(() =>
  createStyles({
    content: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "100%",
      paddingTop: "1.5rem",
    //   overflow: "hidden",
      "& img": {
        width: "100%",
      },
    },
  })
);

function ProfileImage(): JSX.Element {
    const classes = useStyles();
    return (
        <>
        <Grid container>
            <Grid item className={classes.content}>
            <Button
                variant="outlined"
                component="label"
                style={{
                    borderRadius: "50%",
                    padding: "15px",
                }}
            >
            <img src="/img/mascot.png" alt="capoo" />
                {/* <input
                    type="file"
                    hidden
                /> */}
            </Button>
            </Grid>
        </Grid>
        </>
    );
}
  
  export default ProfileImage;
  