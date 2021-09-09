import NavBar from "../NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { User } from "../../App";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { Link , useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as React from "react";
import {DataGrid, GridColDef, GridValueGetterParams} from "@material-ui/data-grid";


interface Faculty {
  id: string;
  faculty_name: string;
  faculty_code: string;
}

interface Department {
  id: string;
  faculty_code: string;
  department_name: string;
  department_code: string;
}

const Users = () => {
  
  

}

let initialFormData = { id: null, name: "", gender: "", email: "" };





interface Data {
  Post_id:string;
  Username:string;
  Name:string;
  Surname:string;
  Email:string;
  Faculty:string;
  Department:string;
  Year:string;
  Answer:string;
}

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
  contact: string;
  create: string;
  desc: string;
  is_activate: string;
  is_all: boolean;
  last_modify: string;
  post_type: string;
  qualification: {
    year: string;
  }[];
  quantity: string;
  title: string;
  user_name: string;
  __v: number;
  _id: string;
  numberAppli: string;
  Post_id:string;
  Username:string;
  Name:string;
  Surname:string;
  Email:string;
  Faculty:string;
  Department:string;
  Year:string;
  Answer:string;
}

interface ParamType {
  postId: string;
}



function Body({ user, setUser }: Bodyprops): JSX.Element {
  const classes = useStyles();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [Data, setData] = useState<Data[]>([]);

  const [open, setOpen] = React.useState(false);
  const [openAnswer, setOpenAnswer] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenAnswer = () => {
    setOpenAnswer(true);
  };

  const handleCloseAnswer = () => {
    setOpenAnswer(false);
  };

  const [subjects, setSubjects] = useState<Subject>({} as Subject);
  const param = useParams<ParamType>();
  useEffect(() => {
    axios
      .get(`/csv/headTable/${param.postId}`)
      .then((response) => {
        setSubjects(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [param.postId]);
  //console.log(subjects);

  useEffect(() => {
    axios
      .get(`/csv/DataCSV/${param.postId}`)
      .then((response) => {
        setData(response.data);
        //console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [param.postId]);
  //console.log(Data);

  useEffect(() => {
    axios.get("/dropdowns/faculties").then((response) => {
      setFaculties(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/dropdowns/alldepartment`)
      .then((response) => {
        setDepartments(response.data);
      });
  }, []);

  const facultyCodeToFacultyName = (facultyCode:string) => {
    const facultyName = faculties.find(({faculty_code})=>faculty_code===facultyCode)?.faculty_name 
    return facultyName
  }

  const departmentCodeToDepartmentName = (departmentCode:string) => {
    const departmentName = departments.find(({department_code})=>department_code===departmentCode)?.department_name 
    return departmentName
  }

  const r = Data.map((data,i)=>{
    //return createData(  i+1 , subject.Name, subject.Surname ,subject.Email, subject.Faculty, subject.Department, subject.Year );
    return {id : i+1 , firstName : data.Name, lastName: data.Surname ,email: data.Email,faculty: facultyCodeToFacultyName(data.Faculty),department: departmentCodeToDepartmentName(data.Department),year: data.Year,answer: data.Answer}
  });

  const c: GridColDef[] = [
    { field: "id", headerName: "#", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      width: 150,
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "faculty",
      headerName: "Faculty",
      width: 150,
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
      editable: true,
    },
    {
      field: "year",
      headerName: "Year",
      type: "string",
      width: 130,
    },
    {
      field: "answer",
      headerName: " ",
      description: "Student's answer",
      sortable: false,
      type: "string",
      renderCell: () => (
        <div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={handleClickOpenAnswer}

          >
            Answer
          </Button>
          <Dialog
            open={openAnswer}
            onClose={handleCloseAnswer}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Student's answer"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Let Google help apps determine location. This means sending anonymous location data to
                Google, even when no apps are running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAnswer} color="primary" autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>  
        </div>
      ),
    },
  ];

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
              {subjects.title}
              <Chip
                className={classes.cooler3}
                style={{ marginLeft: 20 }}
                label={`${subjects.numberAppli} คน`}
              />
            </Grid>
          </Typography>
        </Grid>
        <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={r}
          columns={c}
          pageSize={10}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
        <Grid container justifyContent="center" alignItems="center">
          <Button
            style={{ marginTop: 50, marginBottom: 50 }}
            className={classes.cooler2}
            variant="contained"
            color="primary"
            onClick={handleClickOpen}
          >
            Submit
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"PIPI KENG JUNG"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                submit success!!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                Acknowledge
              </Button>
            </DialogActions>
          </Dialog>

          <Link to={`/myposts`} style={{ textDecoration: "none" }}>
            <Button
              href="/myposts"
              style={{ marginTop: 50, marginLeft: 20, marginBottom: 50 }}
              className={classes.cooler}
              variant="contained"
              color="primary"
            >
              Back
            </Button>
          </Link>
        </Grid>
      </Container>
    </Grid>
  );
}

export default Body;
