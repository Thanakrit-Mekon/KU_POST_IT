import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Box, Hidden, Button } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#5E9EA0",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
        justifyContent: "flex-start",
      },
    },
    content: {
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        [theme.breakpoints.down("xs")]: {
            flexDirection: "column",
            justifyContent: "flex-start",
            borderTopRightRadius: "25px",
            borderTopLeftRadius: "25px",
            borderButtomLeftRadius: "0px",
            borderButtomRightRadius: "0px",
            height: "100vh",
        },
    },
    imggif: {
        width: 200,
        height: 200,
    },
    logo: {
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    overflow: "hidden",
    "& img": {
        width: "80%",
        [theme.breakpoints.down("xs")]: {
        width: "50%",
        marginTop: "70px",
        marginBottom: "70px",
        },
        objectFit: "cover",
    },
    },
  })
);

function VerifiedEmail(): JSX.Element {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Hidden smUp>
                <Box className={classes.logo}>
                <img src="/img/logo.png" alt="logo" />
                </Box>
                <Box
                className={classes.content}
                style={{ padding: "20px 45px 30px 45px" }}
                >
                    <img className={classes.imggif} src="/img/verified_email.gif" alt=""/>
                    <Typography variant="h4" color="primary">
                        <Box fontWeight="bold" mb={1}>
                            Verified!
                        </Box>
                    </Typography>
                    <Typography variant="subtitle1" align="center">Congratulations, Your email have successfully verified.</Typography>
                    <RouterLink to="/login" style={{ textDecoration:"none", marginTop:20, minWidth:"100%" }}>
                    <Button variant="contained" color="primary" fullWidth>Login now</Button>
                    </RouterLink>
                </Box>
            </Hidden>
            <Hidden xsDown>
            <Box
            borderRadius="7px"
            boxShadow={4}
            className={classes.content}
            style={{ padding: "20px 45px 30px 45px" }}
            >
                <img className={classes.imggif} src="/img/verified_email.gif" alt=""/>
                <Typography variant="h4" color="primary">
                    <Box fontWeight="bold" mb={1}>
                        Verified!
                    </Box>
                </Typography>
                <Typography variant="subtitle1" align="center">Congratulations, Your email have successfully verified.</Typography>
                <RouterLink to="/login" style={{ textDecoration:"none", marginTop:20, minWidth:"100%" }}>
                <Button variant="contained" color="primary" fullWidth>Login now</Button>
                </RouterLink>
            </Box>
            </Hidden>
        </div>
    );
}
  
export default VerifiedEmail;