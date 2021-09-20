import NavBar from "../NavBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme, useMediaQuery, useTheme } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import { User } from "../../App";
import axios from "../../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as React from "react";
import {
  DataGrid,
  GridApi,
  GridCellValue,
  GridColDef,
  GridToolbar,
} from "@material-ui/data-grid";

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

interface Data {
  Post_id: string;
  Username: string;
  Name: string;
  Surname: string;
  Email: string;
  Faculty: string;
  Department: string;
  Year: string;
  Answer: string;
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
  title: string;
  number_appli: string;
  Post_id: string;
}

interface ParamType {
  postId: string;
}

function PostActivate({ user, setUser }: Bodyprops): JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });
  const classes = useStyles();
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [Data, setData] = useState<Data[]>([]);
  const [answer, setAnswer] = useState("");
  const [openAnswer, setOpenAnswer] = React.useState(false);

  const handleClickOpenAnswer = (answer: string) => {
    setAnswer(answer);
    setOpenAnswer(true);
  };

  const handleCloseAnswer = () => {
    setOpenAnswer(false);
  };

  const [subjects, setSubjects] = useState<Subject>({} as Subject);
  const param = useParams<ParamType>();
  useEffect(() => {
    axios
      .get(`datatable/heading_qualified/${param.postId}`)
      .then((response) => {
        setSubjects(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [param.postId]);

  useEffect(() => {
    axios.get("/dropdowns/faculties").then((response) => {
      setFaculties(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/dropdowns/alldepartment`).then((response) => {
      setDepartments(response.data);
    });
  }, []);

  const facultyCodeToFacultyName = (facultyCode: string) => {
    const foundFaculty = faculties.find(
      ({ faculty_code }) => faculty_code === facultyCode
    );
    if (foundFaculty) return foundFaculty.faculty_name;
    return "";
  };

  const departmentCodeToDepartmentName = (departmentCode: string) => {
    const foundDepartment = departments.find(
      ({ department_code }) => department_code === departmentCode
    );
    if (foundDepartment) return foundDepartment.department_name;
    return "";
  };

  useEffect(() => {
    axios
      .get(`datatable/qualified/${param.postId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }, [param.postId]);

  const r = Data.map((data, i) => {
    return {
      id: i + 1,
      firstName: data.Name,
      lastName: data.Surname,
      email: data.Email,
      faculty: facultyCodeToFacultyName(data.Faculty),
      department: departmentCodeToDepartmentName(data.Department),
      year: data.Year,
      answer: data.Answer,
    };
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
      renderCell: (params) => {
        const onClick = () => {
          const api: GridApi = params.api;
          const fields = api
            .getAllColumns()
            .map((c) => c.field)
            .filter((c) => c !== "__check__" && !!c);
          const thisRow: Record<string, GridCellValue> = {};
          fields.forEach((f) => {
            thisRow[f] = params.getValue(params.row.id, f);
          });
          return handleClickOpenAnswer(params.row.answer);
        };

        return (
          <Button
            variant="contained"
            color="primary"
            size="small"
            style={{ marginLeft: 16 }}
            onClick={onClick}
          >
            Answer
          </Button>
        );
      },
    },
  ];

  return (
    <Grid className={classes.root}>
      <NavBar user={user} setUser={setUser} />
      <Container style={{ paddingTop: 60 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          style={{ paddingBottom: 50 }}
        >
          <Typography variant={isMobile ? "h5" : "h4"}>
            <Grid>
              {subjects.title}
              <Chip
                className={classes.cooler3}
                style={{ marginLeft: 20 }}
                label={`${subjects.number_appli} คน`}
              />
            </Grid>
          </Typography>
        </Grid>
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={r}
            columns={c}
            pageSize={10}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>

        <Grid container justifyContent="center" alignItems="center">
          <Button
            href="/myposts"
            style={{ marginTop: 50, marginBottom: 50 }}
            className={classes.cooler}
            variant="contained"
            color="primary"
          >
            Back
          </Button>
        </Grid>
      </Container>
      <Dialog
        open={openAnswer}
        onClose={handleCloseAnswer}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Student's answer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {answer}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAnswer} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default PostActivate;
