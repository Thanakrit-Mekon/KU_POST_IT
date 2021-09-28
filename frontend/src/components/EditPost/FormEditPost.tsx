import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import {
  Typography,
  RadioGroup,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  withStyles,
  RadioProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
  useMediaQuery,
  Hidden,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import { useHistory, Link, useParams, useLocation } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { useState } from "react";

interface ParamType {
  PostId: string;
}

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

interface Subject {
  contact: string;
  desc: string;
  dueDate: any;
  endDate: string;
  hasPeriod: boolean;
  isDueDate: boolean;
  is_all: boolean;
  last_modify: string;
  qualification: {
    faculty_code: string;
    department_code: string;
    year: string;
  }[];
  quantity: string;
  startDate: string;
  title: string;
}

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  button: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      width: "100%",
    },
  },
}));

const GreenRadio = withStyles({
  root: {
    color: "#5E9EA0",
    "&$checked": {
      color: "#5E9EA0",
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

const validationSchema = yup.object({
  title: yup.string().required(),
  contact: yup.string().required(),
  number: yup.number().required(),
  more: yup.string(),
});

function FormEditPost() {
  const param = useParams<ParamType>();
  const theme = useTheme();

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [subject, setSubject] = useState<Subject>({} as Subject);

  const location = useLocation();
  const classes = useStyles();
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };

  function handleClick() {
    history.goBack();
  }

  const formik = useFormik({
    initialValues: {
      title: `${subject.title}`,
      type: subject.is_all,
      contact: `${subject.contact}`,
      number: `${subject.quantity}`,
      more: `${subject.desc}`,
      isDueDate: subject.isDueDate,
      dueDate: `${subject.dueDate}`,
      hasPeriod: subject.hasPeriod,
      requirements: subject.qualification,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        title: values.title,
        contact: values.contact,
        quantity: values.number,
        desc: values.more,
        isDueDate: values.isDueDate,
        dueDate: selectedDate,
        post_id: location.pathname.slice(12),
      };
      axios
        .post("/posts/edit_post", userData)
        .then(function (response) {
          handleOpen();
        })
        .catch(function (error) {
        });
    },
  });

  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date()
  );

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [startDate, setStartDate] = React.useState<Date | null>(new Date());
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const [endDate, setEndDate] = React.useState<Date | null>(new Date());
  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  useEffect(() => {
    axios
      .get(`/posts/specific_post/${location.pathname.slice(12)}`)
      .then((response) => {
        setSubject(response.data);
        setSelectedDate(response.data.dueDate);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
      })
      .catch(function (error) {});
  }, [location.pathname]);

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
    const facultyName = faculties.find(
      ({ faculty_code }) => faculty_code === facultyCode
    )?.faculty_name;
    return facultyName;
  };

  const departmentCodeToDepartmentName = (departmentCode: string) => {
    const departmentName = departments.find(
      ({ department_code }) => department_code === departmentCode
    )?.department_name;
    return departmentName;
  };

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: 20 }}
      >
        <Typography 
          component="h1" 
          variant="h4" 
          color="primary" 
        >
          Edit Post
        </Typography>
        <Hidden xsDown>
        <div className={classes.buttons}>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginRight: 10 }}
            >
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Editing has been done.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/myposts" style={{ textDecoration: "none" }}>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Continue
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
              Save
            </Button>
          </div>
          <Link to="/myposts" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              aria-label="outlined secondary button group"
              onClick={() => handleClick}
            >
              Cancel
            </Button>
          </Link>
        </div>
        </Hidden>
      </Grid>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={9}>
          <TextField
            name="title"
            size="medium"
            fullWidth
            variant="outlined"
            label="Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
        </Grid>
        <Grid item xs={12} sm={3} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Number of Students"
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
          ></TextField>
        </Grid>
      </Grid>

      <Typography
        component="h6"
        variant="h5"
        align="left"
        color="primary"
        style={{ marginTop: 10 }}
      >
        Due Date
      </Typography>
      <RadioGroup
        aria-label="isDueDate"
        name="isDueDate"
        value={`${formik.values.isDueDate}`}
        onChange={formik.handleChange}
        row
        color="primary"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Grid container justifyContent="flex-start" alignItems="center">
          <div>
            <FormControlLabel
              value="false"
              control={<GreenRadio />}
              label="No Due Date"
            />
            <FormControlLabel
              value="true"
              control={<GreenRadio />}
              label="Set Due Date"
            />
          </div>
          {String(formik.values.isDueDate) === "true" && (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="dense"
                id="due date picker"
                label="Due Date Picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          )}
        </Grid>
      </RadioGroup>
      <Typography
        component="h6"
        variant="h5"
        align="left"
        color="primary"
        style={{ marginTop: 10 }}
      >
        Working Period
      </Typography>
      <RadioGroup
        aria-label="hasPeriod"
        name="hasPeriod"
        value={`${formik.values.hasPeriod}`}
        onChange={formik.handleChange}
        row
        color="primary"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Grid container justifyContent="flex-start" alignItems="center">
          <div>
            <FormControlLabel
              value="false"
              control={<GreenRadio disabled />}
              label="To Be Announced"
            />
            <FormControlLabel
              value="true"
              control={<GreenRadio disabled />}
              label="Set Period "
            />
          </div>

          {String(formik.values.hasPeriod) === "true" && (
            <>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="dense"
                  id="start date picker"
                  label="Start Date Picker"
                  value={startDate}
                  onChange={handleStartDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disabled
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="dense"
                  id="end date picker"
                  label="End Date Picker"
                  value={endDate}
                  onChange={handleEndDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </>
          )}
        </Grid>
      </RadioGroup>
      <Typography
        component="h6"
        variant="h5"
        align="left"
        color="primary"
        style={{ marginTop: "-10px" }}
      >
        Requirement
      </Typography>
      <RadioGroup
        aria-label="type"
        name="type"
        value={`${formik.values.type}`}
        onChange={formik.handleChange}
        row
        color="primary"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <FormControlLabel
            value="true"
            control={<GreenRadio disabled />}
            label="All Faculties"
          />
          <FormControlLabel
            value="false"
            control={<GreenRadio disabled />}
            label="Specific Faculty"
          />
        </div>
      </RadioGroup>
      {String(formik.values.type) !== "true" &&
        formik.values.requirements &&
        formik.values.requirements.map((r, index) => {
          return (
            <Grid container spacing={1} style={{ marginBottom: 5 }}>
              <Grid item sm={6}>
                <TextField
                  size="medium"
                  fullWidth
                  variant="outlined"
                  label="Faculty"
                  name="faculty"
                  value={facultyCodeToFacultyName(
                    formik.values.requirements[index].faculty_code
                  )}
                  disabled
                ></TextField>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  size="medium"
                  fullWidth
                  variant="outlined"
                  label="Department"
                  name="department"
                  value={departmentCodeToDepartmentName(
                    formik.values.requirements[index].department_code
                  )}
                  disabled
                ></TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  size="medium"
                  fullWidth
                  variant="outlined"
                  label="Year"
                  name="year"
                  value={formik.values.requirements[index].year}
                  disabled
                ></TextField>
              </Grid>
            </Grid>
          );
        })}
      <Grid container spacing={1}>
        <Grid item xs={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Contact"
            multiline
            rows={1}
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <TextField
          id="outlined-textarea"
          fullWidth
          label="More Requirement"
          multiline
          rows={7}
          variant="outlined"
          name="more"
          value={formik.values.more}
          onChange={formik.handleChange}
          error={formik.touched.more && Boolean(formik.errors.more)}
        />
      </Grid>
      <Hidden smUp>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ marginTop: isMobile ? 10 : 20 }}
        spacing={isMobile ? 2 : 0}
      >
        <Grid item xs={6} sm={1} style={{ marginRight: isMobile ? 0 : 20 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Editing has been done.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to="/myposts" style={{ textDecoration: "none" }}>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Continue
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
              Save
            </Button>
          </Grid>
          <Grid item xs={6} sm={1}>
          <Link to="/myposts" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              aria-label="outlined secondary button group"
              className={classes.button}
              onClick={() => handleClick}
            >
              Cancel
            </Button>
          </Link>
          </Grid>
        </Grid>
        </Hidden>
    </form>
  );
}

export default FormEditPost;
