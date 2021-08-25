import NavBar from "../NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import DataTable from "../Table/dataTable";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { User } from "../../App";
import axios from "../../axios";
import { useEffect, useState } from "react";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "100vh",
    },

    cooler: {
      zindex: "-1",
      color: "white",
      backgroundColor: "#F9A41A",
    },

    cooler2: {
      color: "white",
      backgroundColor: "#DB524E",
    },

    cooler3: {
      color: "white",
      background: "#83D2D4",
    },
  })
);

export interface Bodyprops {
  user: User | null;
  setUser: (user: User | null) => void;
}

interface Subject {
  contact: string
  create: string
  desc: string
  is_activate: string
  is_all: boolean
  last_modify: string
  post_type: string
  qualification: {
    year: string
  }[]
  quantity: string
  title: string
  user_name: string
  __v: number
  _id: string
}

function Body({ user, setUser }: Bodyprops): JSX.Element {
  const classes = useStyles();

  const [subjects, setSubjects] = useState<Subject[]>([]);
  useEffect(() => {
    axios.get(`/posts/myposts`).then((response) => {
      setSubjects(response.data);
    });
    
  }, []);
  console.log(subjects);  

  return (
    <Grid className={classes.root}>
      <NavBar user={user} setUser={setUser} />
      <Container style={{ paddingTop: 100 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ paddingBottom: 50 }}
        >
          <Typography variant="h4">
            <Grid item>
              TA รายวิชา Database 01204xxx
              <Chip
                className={classes.cooler3}
                style={{ marginLeft: 20 }}
                label="26 คน"
              />
            </Grid>
          </Typography>
          <Button className={classes.cooler} variant="contained">
            Refresh
          </Button>
        </Grid>
        <DataTable />
        <Grid container justifyContent="center" alignItems="center">
          <Button
            style={{ marginTop: 50  , marginBottom:50 }}
            className={classes.cooler2}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            href="/myposts"
            style={{ marginTop: 50 , marginLeft:20 , marginBottom:50}}
            className={classes.cooler}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Body;
