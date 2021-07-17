import { useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Box, Typography, AppBar, Tabs, Tab } from "@material-ui/core";
import StudentRegistrationForm from "./StudentRegistrationForm";

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
        <Box py={5} px={10} style={{ flexGrow: 1 }}>
          {children}
        </Box>
      )}
    </>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
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
        objectFit: "cover",
      },
    },
  })
);

function RegistrationCard(): JSX.Element {
  const classes = useStyles();
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabChange = (e: React.ChangeEvent<{}>, index: number) => {
    setTabIndex(index);
  };

  return (
    <>
      <Grid container>
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
              <Typography>Tab 2</Typography>
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <Typography>Tab 3</Typography>
            </TabPanel>
          </Box>
        </Grid>
        <Grid item sm={5} className={classes.bgTeal}>
          <Box
            borderRadius="0 4px 4px 0"
            boxShadow={6}
            className={classes.content}
          >
            <img
              src="https://stickershop.line-scdn.net/stickershop/v1/product/4141/IOS/main_animation@2x.png"
              alt="capoo"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default RegistrationCard;
