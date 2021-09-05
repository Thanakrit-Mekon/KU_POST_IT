import { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  AppBar,
  Tabs,
  Tab,
  Hidden,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import StudentRegistrationForm from "./StudentRegistrationForm";
import TeacherRegistrationForm from "./TeacherRegistrationForm";
import CompanyRegistrationForm from "./CompanyRegistrationForm";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps): JSX.Element {
  const { children, index, value } = props;

  return (
    <>
      {value === index && (
        <>
          <Hidden xsDown>
            <Box py={5} px={10} style={{ flexGrow: 1 }}>
              {children}
            </Box>
          </Hidden>
          <Hidden smUp>
            <Box>{children}</Box>
          </Hidden>
        </>
      )}
    </>
  );
}

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      [theme.breakpoints.down("xs")]: {
        display: "flex",
        flexDirection: "column-reverse",
      },
    },
    bgTeal: {
      backgroundColor: "#5E9EA0",
    },
    bgWhite: {
      backgroundColor: "white",
    },
    leftCol: {
      borderRadius: "4px 0 0 4px",
    },
    rightCol: {
      borderRadius: "0 4px 4px 0",
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
      "& img": {
        width: "80%",
        [theme.breakpoints.down("xs")]: {
          width: "50%",
          marginTop: "10px",
        },
        objectFit: "cover",
      },
    },
  })
);

function RegistrationCard(): JSX.Element {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Grid container className={classes.container}>
        <Grid item sm={7} className={classes.bgWhite}>
          <Box
            borderRadius="4px 0 0 4px"
            boxShadow={4}
            className={classes.content}
          >
            {/* Form */}
            <AppBar position="static" color="default">
              <Tabs
                value={tabIndex}
                onChange={handleTabChange}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab wrapped label="Student" />
                <Tab wrapped label="Teacher" />
                <Tab wrapped label="Company" />
              </Tabs>
            </AppBar>
            <TabPanel value={tabIndex} index={0}>
              <StudentRegistrationForm />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <TeacherRegistrationForm />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <CompanyRegistrationForm />
            </TabPanel>
          </Box>
        </Grid>
        <Grid item sm={5} className={classes.bgTeal}>
          <Box
            borderRadius="0 4px 4px 0"
            boxShadow={isMobile ? 0 : 6}
            className={classes.content}
          >
            <Hidden xsDown>
              <img src="/img/mascot.png" alt="mascot" />
            </Hidden>
            <img src="/img/logo.png" alt="logo" />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default RegistrationCard;
