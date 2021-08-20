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
}

function QueryUser() {
  const location = useLocation();
  const [subjects, setSubjects] = useState<Subject[]>([]);
  useEffect(() => {
    axios.get(`feed/find${location.pathname}`).then((response) => {
      console.log(response.data);
      setSubjects(response.data);
    });
  }, [location.pathname]);

  return (
    <div>
      <NavBar />
      <Container maxWidth="md">
        <Typography variant="h4" color="primary">
          <Box fontWeight="bold" style={{ marginTop: 50, marginBottom: 5 }}>
            Teacher Assistant - TA
          </Box>
        </Typography>
        <Typography variant="subtitle1">
          <Box mb={5}>
            สำหรับอาจารย์ที่ต้องการหานิสิตมาเป็นTAช่วยในรายวิชาต่างๆนิสิตสามารถเลือกสมัครเป็นTAในแต่ล่ะวิชาได้
          </Box>
        </Typography>
        <Grid container spacing={5}>
          {subjects.map((obj) => {
            return (
              <Grid item sm={4}>
                <Card style={{ padding: 20 }}>
                  <Grid container direction="column" alignItems="center">
                    <Avatar />
                    <Box>{obj.user_name}</Box>
                    <Typography color="primary">
                      <Box fontWeight="bold" color="primary">
                        {obj.title}
                      </Box>
                    </Typography>
                    {/* <Icon className="fa fa-user" /> */}
                    <Box alignItems="center">
                      <FontAwesomeIcon icon={faUser} /> ต้องการ {obj.candidate} คน
                    </Box>
                    <Grid
                      container
                      justifyContent="center"
                      style={{ marginTop: 20 }}
                    >
                      <Link to={`/posts/${obj.id}`} style={{ textDecoration: "none" }}>
                        <Button variant="contained" color="primary">
                          Register
                        </Button>
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
