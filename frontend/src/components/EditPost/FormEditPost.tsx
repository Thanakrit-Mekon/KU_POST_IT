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
import { Formik, useFormik } from "formik";
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
  }[]
  quantity: string;
  startDate: string;
  title: string;
}
const faculty_name =
{
  'A': 'Agriculture',
  'B': 'Fisheries',
  'C': 'Forestry',
  'D': 'Science',
  'E': 'Engineering',
  'F': 'Education',
  'G': 'Economics',
  'H': 'Social Sciences',
  'I': 'Veterinary Medicine',
  'K': 'Agro-Industry',
  'L': 'Humanities',
  'N': 'Business Administration',
  'P': 'Veterinary Technology',
  'R': 'Architecture',
  'T': 'Environment',
}

const department_name =
{
  'A00': 'Undeclared',
  'A99': 'Declared',
  'A01': 'Farm Mechanics',
  'A02': 'Entomology',
  'A03': 'Plant Pathology',
  'A04': 'Soil Science',
  'A05': 'Agronomy',
  'A06': 'Horticulture',
  'A07': 'Animal Husbandry',
  'A08': 'Home Economics',
  'A11': 'Agricultural Extension and Communication',
  'B00': 'Undeclared',
  'B01': 'Fishery Management',
  'B02': 'Fishery Biology',
  'B03': 'Aquaculture',
  'B04': 'Fishery Product',
  'B05': 'Marine Science',
  'C00': 'Undeclared',
  'XC00': 'Interdisciplinary',
  'C01': 'Forest Management',
  'C03': 'Forest Products',
  'C05': 'Forest Engineering',
  'C02': 'Forest Biology',
  'XC05': 'Silviculture',
  'XC02': 'DConservation',
  'D00': 'Undeclared',
  'XD00': 'Interdisciplinary',
  'D01': 'Mathematics',
  'D02': 'Chemistry',
  'D04': 'Statistics',
  'D06': 'Nuclear Science',
  'D07': 'Physics',
  'D08': 'General Science',
  'D09': 'Microbiology',
  'D10': 'Genetics',
  'D11': 'Botany',
  'D12': 'Zoology',
  'D13': 'Biochemistry',
  'D14': 'Computer Science',
  'D15': 'Environment',
  'E00': 'Undeclared',
  'XE66': 'Safety Engineering',
  'E01': 'Civil-Water Resources Engineering',
  'E02': 'Agricultural Engineering',
  'E03': 'Mechanical Engineering',
  'E04': 'Civil Engineering - Irrigation',
  'E05': 'Electrical Engineering',
  'E06': 'Civil Engineering',
  'E08': 'Industrial Engineering',
  'E09': 'Computer Engineering',
  'E10': 'Chemical Engineering',
  'E12': 'Food Engineering',
  'E13': 'Aerospace Engineering',
  'E14': 'Environmental Engineering',
  'E16': 'Material Engineering',
  'F00': 'Undeclared',
  'F01': 'Education',
  'F04': 'Education technology',
  'XF11': 'Psychology and Guidance',
  'F31': 'Agricultural',
  'F35': 'Physical Education',
  'XF15': 'Sports and Exercise Science',
  'XF19': 'Vocational Education',
  'G00': 'Undeclared',
  'G01': 'Economics',
  'G02': 'Agricultural and Resource Economics',
  'G03': 'Cooperatives Economics',
  'H00': 'Undeclared',
  'H01': 'Sociology and Anthropology',
  'H02': 'Psychology',
  'H03': 'Political Science and Public Administration',
  'H04': 'Geography and Geo-Informatrics',
  'H06': 'Law',
  'H07': 'History',
  'I00': 'Undeclared',
  'I01': 'Anatomy',
  'I02': 'Pathology',
  'I03': 'Pharmacology and Toxicology',
  'I04': 'Physiology',
  'I05': 'Medicine',
  'I06': 'Surgery',
  'I07': 'Farm Resources and Production Medicine',
  'I08': 'Public Health',
  'I09': 'Microbiology',
  'I12': 'Parasitology',
  'K00': 'Undeclared',
  'K01': 'Packing and Materials Technology',
  'K02': 'Biotechnology',
  'K03': 'Argo-Industrial Product Development',
  'K04': 'Food Science and Technology',
  'K05': 'Textile Science and Technology',
  'K06': 'Chemical and Physical Processing Technology',
  'L00': 'Undeclared',
  'L01': 'Library and Information Science',
  'L02': 'Philosophy and Religion',
  'L03': 'Foreign Language',
  'L04': 'Linguistics',
  'L05': 'Litrature',
  'L06': 'Tourism and Hospitality Industry',
  'L07': 'Western Music',
  'L80': 'Communicative Thai Language',
  'N00': 'Undeclared',
  'XN00': 'Interdisciplinary',
  'N01': 'Finance',
  'N02': 'Business Management',
  'N03': 'Operations Management',
  'N04': 'Marketing',
  'N05': 'Accounting',
  'R01': 'Architecture',
  'P00': 'Veterinary Technology',
  'S00': 'Sriracha Campus',
  'F34': 'Vocational Education',
  'F36': 'Vocational Education',
  'A10': 'Tropical Agriculture',
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
  const [subject,setSubject] = useState<Subject>({} as Subject);

  const param = useParams<ParamType>();
  const location = useLocation();

  console.log(location.pathname)

  const classes = useStyles();

  const history = useHistory();

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
      requirements: [
        {
          faculty: "",
          department: "",
          year: "",
        },
      ],
    },
    enableReinitialize: true,
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

      if (String(values.type) === "true") userData.qualification = [];
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

  console.log(param.PostId)
  console.log(location.pathname.slice(12))
  
  useEffect(() => {
    axios.get(`/posts/specificPost/${location.pathname.slice(12)}`).then((response) => {
      console.log(response)
      setSubject(response.data)
      setSelectedDate(response.data.dueDate)
      setStartDate(response.data.startDate)
      setEndDate(response.data.endDate)
    })
    .catch(function(error){
      console.log(error)
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
        value= {`${formik.values.isDueDate}`}
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
              value= "false"
              control={<GreenRadio />}
              label="No Due Date"
            />
            <FormControlLabel
              value= "true"
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
                value= {selectedDate}
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
              control={<GreenRadio disabled/>}
              label="To Be Announced"
            />
            <FormControlLabel
              value="true"
              control={<GreenRadio disabled/>}
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
            control={<GreenRadio disabled/>}
            label="All Faculties"
          />
          <FormControlLabel
            value="false"
            control={<GreenRadio disabled/>}
            label="Specific Faculty"
          />
        </div>
      </RadioGroup>
      {String(formik.values.type) !== "true" &&
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