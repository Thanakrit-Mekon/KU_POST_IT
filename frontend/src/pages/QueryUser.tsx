import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  Avatar,
  Button,
} from "@material-ui/core";
import NavBar from "../components/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../axios";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(() =>
  createStyles({
    change: {
      color: "white",
      backgroundColor: "#F9A41A",
      "&:hover": { backgroundColor: "#F9A41A" },
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
  var usertype = -1;
  if (user?.location) {
    usertype = 3;
    //3=company  2=teacher 1=student
  } else if (user?.student_id) {
    usertype = 1;
  } else {
    usertype = 2;
  }
  // console.log(usertype);
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
      <Container maxWidth="md">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" color="primary">
              <Box fontWeight="bold" style={{ marginTop: 50, marginBottom: 5 }}>
                {location.pathname === "/ta"
                  ? "Teacher Assistant - TA"
                  : location.pathname === "/coop"
                  ? "Project Cooperation"
                  : "Internship"}
              </Box>
            </Typography>
            <Typography variant="subtitle1">
              <Box mb={5}>
                {location.pathname === "/ta"
                  ? "สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้"
                  : location.pathname === "/coop"
                  ? "สำหรับนิสิตที่ต้องการหานิสิตมาเป็นเพื่อนร่วมทำโครงการ นิสิตสามารถเลือกเข้าร่วมเป็นนิสิตในแต่ละโครงการได้"
                  : "สำหรับตัวแทนบริษัทที่ต้องการหานิสิตมาเป็นนิสิตฝึกงาน นิสิตสามารถเลือกเข้าร่วมเป็นนิสิตฝึกงานในแต่ละบริษัทได้"}
              </Box>
            </Typography>
          </Grid>
          <Grid item>
            {(location.pathname === "/ta" && usertype === 2) ||
            (location.pathname === "/coop" && usertype === 1) ||
            (location.pathname === "/intern" && usertype === 3) ? (
              <Link to="/posts/new" style={{ textDecoration: "none" }}>
                <Button className={classes.change} variant="contained">
                  Create Post
                </Button>
              </Link>
            ) : (
              <></>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={5}>
          {subjects.map((obj) => {
            return (
              <Grid item sm={4}>
                <Card style={{ padding: 20 }}>
                  <Grid container direction="column" alignItems="center">
                    <Avatar />
                    {obj.name ? (
                      <Box>{obj.name}</Box>
                    ) : (
                      <Box>
                        {obj.first_name} {obj.last_name}
                      </Box>
                    )}

                    <Typography color="primary">
                      <Box fontWeight="bold" color="primary">
                        {obj.title}
                      </Box>
                    </Typography>
                    <Box>
                      {obj.isDueDate &&
                        "สิ้นสุดการรับสมัคร : " +
                          obj.dueDate.slice(8, 10) +
                          "/" +
                          obj.dueDate.slice(5, 7) +
                          "/" +
                          obj.dueDate.slice(0, 4)}
                    </Box>
                    <Box>
                      {obj.hasPeriod &&
                        "เริ่มทำงาน : " +
                          obj.startDate.slice(8, 10) +
                          "/" +
                          obj.startDate.slice(5, 7) +
                          "/" +
                          obj.startDate.slice(0, 4)}
                    </Box>
                    <Box>
                      {obj.hasPeriod &&
                        "ถึงวันที่ " +
                          obj.endDate.slice(8, 10) +
                          "/" +
                          obj.endDate.slice(5, 7) +
                          "/" +
                          obj.endDate.slice(0, 4)}
                    </Box>

                    {/* <Icon className="fa fa-user" /> */}
                    <Box alignItems="space-between">
                      <FontAwesomeIcon icon={faUser} /> ต้องการ {obj.quantity}{" "}
                      คน{"     "}
                      <FontAwesomeIcon icon={faUser} /> สมัครแล้ว{" "}
                      {obj.candidate} คน
                    </Box>

                    <Grid
                      container
                      justifyContent="center"
                      style={{ marginTop: 20 }}
                    >
                      <Link
                        to={`/posts/${obj.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        {usertype === 1 &&
                          (!obj.thisusersubmit ? (
                            <Button variant="contained" color="primary">
                              Join
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              disabled
                            >
                              Join
                            </Button>
                          ))}
                      </Link>
                      {/* <Button variant="contained" color="secondary">
                          Close
                        </Button> */}
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default QueryUser;
