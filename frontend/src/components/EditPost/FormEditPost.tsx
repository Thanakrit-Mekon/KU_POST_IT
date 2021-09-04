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

interface ParamType {
  PostId: string;
}

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
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
  const location = useLocation();

  console.log(location.pathname)

  const classes = useStyles();

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

  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "true",
      contact: "",
      number: "",
      more: "",
      isDueDate: "false",
      dueDate: "",
      hasPeriod: "false",
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
        dueDate: selectedDate,
        hasPeriod: values.hasPeriod,
        startDate: startDate,
        endDate: endDate,
      };

      if (values.type === "true") userData.qualification = [];
      console.log(userData);
      axios
        .post("/posts/create", userData)
        .then(function (response) {
          console.log(response);
          if (response.status === 201) {
            handleClickOpen();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  });

  console.log(param.PostId)
  console.log(location.pathname.slice(12))
  
  useEffect(() => {
    axios.get(`/myposts/specificPost/${location.pathname.slice(12)}`).then((response) => {
      console.log(response)
    })
    .catch(function(error){
      console.log(error)
    });
  }, [location.pathname.slice(12)]);

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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        container
        alignItems="center"
        justifyContent="space-between"
        style={{ marginBottom: 20 }}
      >
        <Typography component="h1" variant="h4" color="primary">
          Edit Post
        </Typography>
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
                    Your edit already create.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Link to = "/myposts" style={{ textDecoration: "none" }}>
                    <Button onClick={handleClose} color="primary" autoFocus>
                      Continue
                    </Button>
                  </Link>
                </DialogActions>
              </Dialog>
              Save
            </Button>
          </div>
          <Link to="/ta" style={{ textDecoration: "none" }}>
            <Button
              variant="outlined"
              color="secondary"
              aria-label="outlined secondary button group"
            >
              Cancel
            </Button>
          </Link>
        </div>
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
        <Grid item sm={3} style={{ marginBottom: "1rem" }}>
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
          {formik.values.isDueDate === "true" && (
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
        <Grid container justifyContent="flex-start" alignItems="center">
          <div>
            <FormControlLabel
              value="false"
              control={<GreenRadio disabled/>}
              label="To Be Announced"
            />
            <FormControlLabel
              value="true"
              control={<GreenRadio disabled/>}
              label="Set Period "
            />
          </div>
          {formik.values.hasPeriod === "true" && (
            <>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
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
                  disableToolbar
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
        value={formik.values.type}
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
            control={<GreenRadio />}
            label="All Faculties"
          />
          <FormControlLabel
            value="false"
            control={<GreenRadio />}
            label="Specific Faculty"
          />
        </div>
      </RadioGroup>
      {formik.values.type !== "true" &&
        formik.values.requirements.map((r, index) => {
          return (
            <Grid container spacing={1} style={{ marginBottom: 5 }}>
              <Grid item sm={6}>
                <TextField
                  size="medium"
                  select
                  fullWidth
                  variant="outlined"
                  label="Faculty"
                  name="faculty"
                  value={formik.values.requirements[index].faculty}
                  onChange={(e) => handleRequirementChange(e, index)}
                  disabled
                >
                </TextField>
              </Grid>
              <Grid item sm={4}>
                <TextField
                  size="medium"
                  select
                  fullWidth
                  variant="outlined"
                  label="Department"
                  name="department"
                  value={formik.values.requirements[index].department}
                  onChange={(e) => handleRequirementChange(e, index)}
                  disabled
                >
                </TextField>
              </Grid>
              <Grid item sm={2}>
                <TextField
                  size="medium"
                  select
                  fullWidth
                  variant="outlined"
                  label="Year"
                  name="year"
                  value={formik.values.requirements[index].year}
                  onChange={(e) => handleRequirementChange(e, index)}
                  disabled
                >
                </TextField>
              </Grid>
            </Grid>
          );
        })}
      <Grid container spacing={1}>
        <Grid item sm={12} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Contact"
            multiline
            rows={2}
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
    </form>
  );
}

export default FormEditPost;