import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Avatar,
  Button,
  Switch,
  FormControlLabel,
  makeStyles,
  createStyles,
  Icon,
  Hidden,
} from "@material-ui/core";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import { User } from "../App";

interface Subject {
  candidate: number;
  contact: string;
  create: string;
  desc: string;
  id: string;
  is_activate: string;
  is_all: boolean;
  last_modify: string;
  post_type: string;
  qualification: {
    department_code: string;
    faculty_code: string;
    year: string;
  }[];
  thisusersubmit: boolean;
  title: string;
  user_name: string;
  first_name: string;
  last_name: string;
  name: string;
  quantity: string;
  isDueDate: boolean;
  dueDate: string;
  startDate: string;
  endDate: string;
  hasPeriod: boolean;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    change: {
      color: "white",
      backgroundColor: "#F9A41A",
      "&:hover": { backgroundColor: "#D98804" },
    },
    icon: {
      [theme.breakpoints.down("xs")]: {
        height: "50px",
        width: "50px",
      },
      height: "75px",
      width: "75px",
      borderRadius: "50px",
      background: "#e0e0e0",
      boxShadow: "20px 20px 60px #bebebe-20px -20px 60px #ffffff",
    },
    description: {
      [theme.breakpoints.down("xs")]: {
        marginBottom: 8,
      },
      marginBottom: 40,
    },
    card: {
      [theme.breakpoints.down("xs")]: {
        padding: 10,
        fontSize: 10,
        minHeight: 180,
      },
      padding: 20,
      minHeight: 220,
      display: "flex",
      alignItems: "center",
      boxShadow:
        "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
    },
    usericon: {
      [theme.breakpoints.down("xs")]: {
        marginRight: 5,
        fontSize: 13,
      },
      marginRight: 10,
    },
    cardtitle: {
      [theme.breakpoints.down("xs")]: {
        fontSize: 13,
      },
      fontSize: 15,
    },
  })
);

export interface queryuserprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

function QueryUser({ user, setUser }: queryuserprops) {
  const classes = useStyles();
  const location = useLocation();
  const [subjects, setSubjects] = useState<Subject[]>([]);

  // Switch
  const [state, setState] = useState({
    checkedA: false,
  });

  const handleChange = (event: any) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  //3=company  2=teacher 1=student
  var usertype = -1;

  if (user?.location) {
    usertype = 3;
  } else if (user?.student_id) {
    usertype = 1;
  } else {
    usertype = 2;
  }

  useEffect(() => {
    axios
      .get(`feed/find${location.pathname}`)
      .then((response) => {
        console.log(response.data);
        setSubjects(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [location.pathname]);

  return (
    <div>
      <NavBar user={user} setUser={setUser} />
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <Grid item>
            <Hidden xsDown>
              <Typography variant="h4" color="primary">
                <Box fontWeight="bold" mt={6} mb={1}>
                  {location.pathname === "/ta"
                    ? "Teacher Assistant"
                    : location.pathname === "/coop"
                    ? "Project Cooperation"
                    : "Internship"}
                </Box>
              </Typography>
            </Hidden>
            <Hidden smUp>
              <Typography variant="h5" color="primary">
                <Box fontWeight="bold" mt={6} mb={1}>
                  {location.pathname === "/ta"
                    ? "Teacher Assistant"
                    : location.pathname === "/coop"
                    ? "Project Cooperation"
                    : "Internship"}
                </Box>
              </Typography>
            </Hidden>
          </Grid>
          <Grid item>
            <Hidden xsDown>
              {(location.pathname === "/ta" && usertype === 2) ||
              (location.pathname === "/coop" && usertype === 1) ||
              (location.pathname === "/intern" && usertype === 3) ? (
                <Box textAlign="end" mb={1}>
                  <Link to="/posts/new" style={{ textDecoration: "none" }}>
                    <Button
                      className={classes.change}
                      size="medium"
                      variant="contained"
                    >
                      Create Post
                    </Button>
                  </Link>
                </Box>
              ) : (
                <></>
              )}
            </Hidden>
            <Hidden smUp>
              {(location.pathname === "/ta" && usertype === 2) ||
              (location.pathname === "/coop" && usertype === 1) ||
              (location.pathname === "/intern" && usertype === 3) ? (
                <Box textAlign="end" mb={1}>
                  <Link to="/posts/new" style={{ textDecoration: "none" }}>
                    <Button
                      className={classes.change}
                      size="small"
                      variant="contained"
                    >
                      Create Post
                    </Button>
                  </Link>
                </Box>
              ) : (
                <></>
              )}
            </Hidden>
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Grid item>
            <Typography className={classes.description} variant="subtitle1">
              {location.pathname === "/ta"
                ? "สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็น TA ช่วยในรายวิชาต่างๆ นิสิตสามารถเลือกสมัครเป็น TA ในแต่ล่ะวิชาได้"
                : location.pathname === "/coop"
                ? "สำหรับนิสิตที่ต้องการหานิสิตมาเป็นเพื่อนร่วมทำโครงการ นิสิตสามารถเลือกเข้าร่วมเป็นนิสิตในแต่ละโครงการได้"
                : "สำหรับตัวแทนบริษัทที่ต้องการหานิสิตมาเป็นนิสิตฝึกงาน นิสิตสามารถเลือกเข้าร่วมเป็นนิสิตฝึกงานในแต่ละบริษัทได้"}
            </Typography>
          </Grid>
          <Hidden mdDown>
            <Grid item>
              {usertype == 1 && (
                <FormControlLabel
                  control={
                    <Switch
                      checked={state.checkedA}
                      onChange={handleChange}
                      name="checkedA"
                      color="primary"
                    />
                  }
                  label="Show only unjoined posts"
                  className={classes.description}
                  style={{ margin: 0 }}
                />
              )}
            </Grid>
          </Hidden>
        </Grid>
        <Hidden lgUp>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="flex-start"
          >
            {usertype == 1 && (
              <FormControlLabel
                control={
                  <Switch
                    checked={state.checkedA}
                    onChange={handleChange}
                    name="checkedA"
                    color="primary"
                  />
                }
                label="Show only unjoined posts"
                style={{ margin: 0 }}
              />
            )}
          </Grid>
        </Hidden>
        <Grid container spacing={3}>
          {subjects.map((obj) => {
            if (state.checkedA && obj.thisusersubmit) {
              return <></>;
            } else {
              return (
                <Grid item xs={12} md={6}>
                  <Card className={classes.card}>
                    <Grid
                      container
                      direction="row"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item xs={5}>
                        <Grid container direction="column" alignItems="center">
                          <Avatar
                            alt="Travis Howard"
                            src="/img/mascot.png"
                            className={classes.icon}
                          />

                          {obj.name ? (
                            <Box
                              textAlign="center"
                              style={{ marginTop: 10, marginBottom: 7 }}
                            >
                              {obj.name}
                            </Box>
                          ) : (
                            <Box
                              textAlign="center"
                              style={{ marginTop: 10, marginBottom: 7 }}
                            >
                              {obj.first_name} {obj.last_name}
                            </Box>
                          )}

                          <Typography color="primary">
                            <Box
                              className={classes.cardtitle}
                              fontWeight="bold"
                              textAlign="center"
                              color="primary"
                            >
                              {obj.title}
                            </Box>
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs={7}>
                        <Box mt={1}>
                          {obj.isDueDate
                            ? "Duedate : " +
                              obj.dueDate.slice(8, 10) +
                              "/" +
                              obj.dueDate.slice(5, 7) +
                              "/" +
                              obj.dueDate.slice(0, 4)
                            : "No Duedate"}
                        </Box>
                        <Box mt={1}>
                          {obj.hasPeriod
                            ? "Work peroid : " +
                              obj.startDate.slice(8, 10) +
                              "/" +
                              obj.startDate.slice(5, 7) +
                              "/" +
                              obj.startDate.slice(0, 4) +
                              " - " +
                              obj.endDate.slice(8, 10) +
                              "/" +
                              obj.endDate.slice(5, 7) +
                              "/" +
                              obj.endDate.slice(0, 4)
                            : "No Work period"}
                        </Box>

                        <Grid
                          container
                          justifyContent="space-around"
                          style={{ marginTop: 10 }}
                        >
                          <Box>
                            <Icon
                              fontSize="small"
                              color="primary"
                              className={classes.usericon}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </Icon>
                            Need {obj.quantity} people
                          </Box>
                          <Box>
                            <Icon
                              fontSize="small"
                              color="primary"
                              className={classes.usericon}
                            >
                              <FontAwesomeIcon icon={faUser} />
                            </Icon>
                            Joined {obj.candidate} people
                          </Box>
                        </Grid>

                        {usertype === 1 &&
                          (!obj.thisusersubmit ? (
                            <Link
                              to={`/posts/${obj.id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                style={{ marginTop: 20 }}
                                fullWidth
                              >
                                Join
                              </Button>
                            </Link>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              style={{ marginTop: 20 }}
                              fullWidth
                              disabled
                            >
                              Join
                            </Button>
                          ))}
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              );
            }
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default QueryUser;
