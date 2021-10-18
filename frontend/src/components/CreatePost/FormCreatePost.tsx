import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import {
  Typography,
  MenuItem,
  RadioGroup,
  Button,
  Grid,
  TextField,
  FormControlLabel,
  Radio,
  Fab,
  withStyles,
  RadioProps,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
  Hidden,
  Box,
  FormHelperText,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "../../axios";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Link, useHistory } from "react-router-dom";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

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

const current_year = 64;
const years = [
  "All",
  current_year - 3,
  current_year - 2,
  current_year - 1,
  current_year,
];

const useStyles = makeStyles((theme) => ({
  button: {
    [theme.breakpoints.down("xs")]: {
      display: "block",
      width: "100%",
    },
  },
  error: {
    color: "red",
    paddingLeft: "5px",
  },
  dateError: {
    color: "red",
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
  title: yup.string().required("Title cannot be empty"),
  contact: yup.string().required("Contact cannot be empty"),
  number: yup
    .number()
    .min(1)
    .typeError("you must specify a number")
    .required("Cannot be empty"),
  more: yup.string(),
  isDueDate: yup.boolean().required(),
  hasPeriod: yup.boolean().required(),
  dueDate: yup.date().when("isDueDate", (isDueDate, schema) => {
    if (isDueDate) return schema.min(Date());
  }),
  startDate: yup.date().when("hasPeriod", (hasPeriod, schema) => {
    if (hasPeriod) return schema.min(Date());
  }),
  endDate: yup.date().when("hasPeriod", (hasPeriod, schema) => {
    if (hasPeriod) return schema.min(yup.ref("startDate"));
  }),
});

function FormCreatePost() {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  function handleClick() {
    history.goBack();
  }

  const isMobile = useMediaQuery(theme.breakpoints.down("xs"), {
    defaultMatches: true,
  });

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "true",
      contact: "",
      number: "",
      more: "",
      isDueDate: "false",
      dueDate: tomorrow,
      hasPeriod: "false",
      endDate: tomorrow,
      startDate: tomorrow,
      requirements: [
        {
          faculty: "",
          department: "",
          year: "",
        },
      ],
    },
    validationSchema,
    onSubmit: (values) => {
      const userData = {
        title: values.title,
        is_all: values.type,
        contact: values.contact,
        quantity: values.number,
        desc: values.more,
        qualification: values.requirements,
        isDueDate: values.isDueDate,
        dueDate: values.dueDate,
        hasPeriod: values.hasPeriod,
        startDate: values.startDate,
        endDate: values.endDate,
      };

      if (values.type === "true") userData.qualification = [];
      console.log(userData);
      axios
        .post("/posts/create", userData)
        .then(function (response) {
          handleClickOpen();
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

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

  const handleRequirementChange = (
    e: React.ChangeEvent<any>,
    index: number
  ) => {
    formik.setFieldValue(
      `requirements[${index}].${e.target.name}`,
      e.target.value
    );
  };

  const onAddRequirement = () => {
    const newR = {
      faculty: "",
      department: "",
      year: "",
    };
    formik.setFieldValue("requirements", [...formik.values.requirements, newR]);
  };

  const onRemoveRequirement = () => {
    if (formik.values.requirements.length !== 1) {
      const newR = formik.values.requirements.filter((requirement, index) => {
        return index !== formik.values.requirements.length - 1;
      });
      formik.setFieldValue("requirements", [...newR]);
    }
  };

  const getDepartmentByFaculty = (falcultyCode: string) => {
    const newDepartments = departments.filter(
      (department) =>
        department.faculty_code === falcultyCode ||
        department.faculty_code === "All"
    );
    return newDepartments;
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    history.goBack();
    setOpen(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        component="h1"
        variant="h4"
        color="primary"
        style={{ marginBottom: 20, marginTop: isMobile ? 15 : 0 }}
        align={isMobile ? "center" : "left"}
      >
        Create Post
      </Typography>
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
          {formik.touched.title && formik.errors.title && (
            <FormHelperText className={classes.error}>
              {formik.errors.title}
            </FormHelperText>
          )}
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
          />
          {formik.touched.number && formik.errors.number && (
            <FormHelperText className={classes.error}>
              {formik.errors.number}
            </FormHelperText>
          )}
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
        value={formik.values.isDueDate}
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
          <div>
            {formik.values.isDueDate === "true" && (
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="dense"
                  id="due date picker"
                  label="Due Date Picker"
                  name="dueDate"
                  value={formik.values.dueDate}
                  onChange={(value) => formik.setFieldValue("dueDate", value)}
                  error={
                    formik.values.isDueDate &&
                    formik.touched.dueDate &&
                    Boolean(formik.errors.dueDate)
                  }
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            )}
            {formik.values.isDueDate === "true" &&
              formik.touched.dueDate &&
              formik.errors.dueDate && (
                <FormHelperText className={classes.dateError}>
                  Due date must be after the date of posting.
                </FormHelperText>
              )}
          </div>
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
        value={formik.values.hasPeriod}
        onChange={formik.handleChange}
        row
        color="primary"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Grid container alignItems="center">
          <div>
            <FormControlLabel
              value="false"
              control={<GreenRadio />}
              label="To Be Announced"
            />
            <FormControlLabel
              value="true"
              control={<GreenRadio />}
              label="Set Period "
            />
          </div>
          {formik.values.hasPeriod === "true" && (
            <Grid container justifyContent="center">
              <Grid item style={{ marginRight: isMobile ? "0" : "10px" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="start date picker"
                    label="Start Date Picker"
                    name="startDate"
                    value={formik.values.startDate}
                    onChange={(value) =>
                      formik.setFieldValue("startDate", value)
                    }
                    error={
                      formik.values.hasPeriod &&
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                {formik.values.hasPeriod === "true" &&
                  formik.touched.startDate &&
                  formik.errors.startDate && (
                    <FormHelperText className={classes.dateError}>
                      Start date must be after the date of posting.
                    </FormHelperText>
                  )}
              </Grid>
              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    id="end date picker"
                    label="End Date Picker"
                    name="endDate"
                    value={formik.values.endDate}
                    onChange={(value) => formik.setFieldValue("endDate", value)}
                    error={
                      formik.values.hasPeriod &&
                      formik.touched.endDate &&
                      Boolean(formik.errors.endDate)
                    }
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                {formik.values.hasPeriod === "true" &&
                  formik.touched.endDate &&
                  formik.errors.endDate && (
                    <FormHelperText className={classes.dateError}>
                      End date must be after start date of working period.
                    </FormHelperText>
                  )}
              </Grid>
            </Grid>
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
        value={formik.values.type}
        onChange={formik.handleChange}
        row
        color="primary"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <FormControlLabel
            value="true"
            control={<GreenRadio />}
            label="All Faculties"
          />
          <FormControlLabel
            value="false"
            control={<GreenRadio />}
            label="Specific Faculty"
          />
        </div>
        <Hidden xsDown>
          {formik.values.type !== "true" && (
            <Grid>
              <Fab
                size="small"
                color="primary"
                style={{ marginRight: 10 }}
                onClick={onAddRequirement}
              >
                <AddIcon />
              </Fab>
              <Fab size="small" color="secondary" onClick={onRemoveRequirement}>
                <RemoveIcon />
              </Fab>
            </Grid>
          )}
        </Hidden>
      </RadioGroup>
      {formik.values.type !== "true" &&
        formik.values.requirements.map((r, index) => {
          return (
            <Grid container spacing={1} style={{ marginBottom: 5 }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  size="medium"
                  select
                  fullWidth
                  variant="outlined"
                  label="Faculty"
                  name="faculty"
                  value={formik.values.requirements[index].faculty}
                  onChange={(e) => handleRequirementChange(e, index)}
                >
                  {faculties &&
                    faculties.map((faculty) => {
                      return (
                        <MenuItem key={faculty.id} value={faculty.faculty_code}>
                          {faculty.faculty_name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={8} sm={4}>
                <TextField
                  size="medium"
                  select
                  fullWidth
                  variant="outlined"
                  label="Department"
                  name="department"
                  disabled={!formik.values.requirements[index].faculty}
                  value={formik.values.requirements[index].department}
                  onChange={(e) => handleRequirementChange(e, index)}
                >
                  {formik.values.requirements[index].faculty &&
                    getDepartmentByFaculty(
                      formik.values.requirements[index].faculty
                    ).map((department, index) => {
                      return (
                        <MenuItem
                          key={department.id}
                          value={department.department_code}
                        >
                          {department.department_name}
                        </MenuItem>
                      );
                    })}
                </TextField>
              </Grid>
              <Grid item xs={4} sm={2}>
                <TextField
                  size="medium"
                  select
                  fullWidth
                  variant="outlined"
                  label="Year"
                  name="year"
                  value={formik.values.requirements[index].year}
                  onChange={(e) => handleRequirementChange(e, index)}
                >
                  {years.map((year, index) => {
                    return (
                      <MenuItem key={index} value={year}>
                        {year}
                      </MenuItem>
                    );
                  })}
                </TextField>
              </Grid>
            </Grid>
          );
        })}
      <Hidden smUp>
        {formik.values.type !== "true" && (
          <Box textAlign="right" marginY={2}>
            <Fab
              size="small"
              color="primary"
              style={{ marginRight: 10 }}
              onClick={onAddRequirement}
            >
              <AddIcon />
            </Fab>
            <Fab size="small" color="secondary" onClick={onRemoveRequirement}>
              <RemoveIcon />
            </Fab>
          </Box>
        )}
      </Hidden>
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
          {formik.touched.contact && formik.errors.contact && (
            <FormHelperText className={classes.error}>
              {formik.errors.contact}
            </FormHelperText>
          )}
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
            Post
          </Button>
        </Grid>
        <Grid item xs={6} sm={1}>
          <Button
            variant="outlined"
            color="secondary"
            aria-label="outlined secondary button group"
            className={classes.button}
            onClick={() => handleClick()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Success!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Your post already create.
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
    </form>
  );
}

export default FormCreatePost;
