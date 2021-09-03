import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import {
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  TextField,
} from "@material-ui/core";
import { useFormik } from "formik";
import axios from "../../axios";
import { useHistory, useParams } from "react-router-dom";
import { User } from "../../App";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {Link as Routerlink } from "react-router-dom";

export interface postinforprops {
  user: User | null;
  
}

const useStyles = makeStyles((theme) => ({
  layout: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
  },
  Card: {
    width: 900,

    padding: theme.spacing(2),
    alignContent: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

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
  title: string;
}

interface ParamType {
  postId: string;
}

export default function PostForm({user}:postinforprops): JSX.Element {
  const history = useHistory();
  const param = useParams<ParamType>();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [subject, setSubject] = useState<Subject>({} as Subject);
  useEffect(() => {
    console.log(param.postId);
    axios.get(`feed/findid/${param.postId}`).then((response) => {
      console.log(response);
      setSubject(response.data);
    });
  }, [param.postId]);

  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    onSubmit: (values) => {
      const data = {
        answer: values.feedback,
        post_id: subject.id,
        post_type: subject.post_type,
      };
      axios.post("/answers/create", data).then(function (response) {
        console.log(response);
        if (response.status === 200 || response.status === 201) {
          handleClickOpen();
        }
        // history.push(`/${subject.post_type}`);
      });
      
    },
  });

  

  
  

  return (
    <>
      <main className={classes.layout}>
        <Paper className={classes.Card}>
          <Typography variant="h4" align="center">
            <Box fontWeight="bold" my={2}>
              {subject.title}
            </Box>
          </Typography>
          <Grid container direction="row" justifyContent="center">
            {subject.qualification?.map((obj) => {
              return (
                <Chip
                  style={{ marginRight: "0.5rem" }}
                  label={`${obj.faculty_code} | ${
                    obj.department_code
                  } | ชั้นปีที่ ${obj.year}`}
                  color="primary"
                  key={obj.department_code}
                />
              );
            })}
          </Grid>

          <Grid container direction="row">
            <Grid item style={{ width: "100%", margin: 30 }}>
              <Typography variant="h6" color="primary">
                <Box mt={3}>รายละเอียดเพิ่มเติม</Box>
              </Typography>

              <Typography
                variant="subtitle1"
                style={{ marginTop: 10, marginBottom: 20 }}
                component="p"
              >
                {subject.desc}
              </Typography>

              <Typography variant="h6" color="primary">
                <Box mt={3}>ช่องทางการติดต่อ</Box>
              </Typography>
              <Typography
                variant="subtitle1"
                style={{ marginTop: 10, marginBottom: 20 }}
                component="p"
              >
                {subject.contact}
              </Typography>
              
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="feedback"
                  size="small"
                  label="ตอบคำถาม & สิ่งที่อยากบอก"
                  variant="outlined"
                  multiline
                  rows={7}
                  fullWidth
                  value={formik.values.feedback}
                  onChange={formik.handleChange}
                />

                {/* <Box mt={2}>
                <form onSubmit={formik.handleSubmit}>
                <TextField
                  name="feedback"
                  size="small"
                  label="ข้อมูลติดต่อ"
                  variant="outlined"
                  multiline
                  rows={5}
                  fullWidth
                  value={formik.values.feedback}
                  onChange={formik.handleChange}
                />

                </form>
                </Box> */}
                <Box mt={4} ml={35} mr={35}>
                  <Grid
                    container 
                    direction="row"
                    justifyContent="space-around"
                    alignItems="center"
                    style={{ paddingTop: "20" }}
                  >
                    <Button 
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                    >
                      Submit
                    </Button>
                    <Dialog
                      open={open}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">{"Congratulations"}</DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Your answer form has been submitted.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Routerlink to={`/${subject.post_type}`} style={{ textDecoration:"none" }}> 
                        <Button  color="primary" autoFocus>
                          OK
                        </Button>
                        </Routerlink>
                      </DialogActions>
                    </Dialog>
                    <Routerlink to={`/${subject.post_type}`} style={{ textDecoration:"none" }}> 
                    <Button
                      variant="contained"
                      color="secondary"
                      size="large" 
                      
                    >
                      Back
                    </Button>
                    </Routerlink>
                  </Grid>
                </Box>
              </form>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  );
}