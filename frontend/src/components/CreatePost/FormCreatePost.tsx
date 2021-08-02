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
} from "@material-ui/core";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

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

const years = [1, 2, 3, 4];

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
}));

const GreenRadio = withStyles({
  root: {
    color: '#5E9EA0',
    "&$checked": {
      color: '#5E9EA0',
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

function FormCreatePost() {
  const classes = useStyles();

  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const formik = useFormik({
    initialValues: {
      title: "",
      type: "any",
      contact: "",
      number: "",
      more: "",
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
      console.log(values);
    },
  });

  useEffect(() => {
    axios.get("http://localhost:3000/dropdowns/faculties").then((response) => {
      setFaculties(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/dropdowns/alldepartment`)
      .then((response) => {
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
    return departments.filter(
      (department) => department.faculty_code === falcultyCode
    );
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
          Create Post
        </Typography>
        <div className={classes.buttons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginRight: 10 }}
          >
            Post
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            aria-label="outlined secondary button group"
          >
            Cancel
          </Button>
        </div>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
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
      </Grid>
      <Typography
        component="h6"
        variant="h5"
        align="left"
        color="primary"
        style={{ marginTop: 20 }}
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
            value="any"
            control={<GreenRadio />}
            label="All Faculties"
          />
          <FormControlLabel
            value="specific"
            control={<GreenRadio />}
            label="Specific Faculty"
          />
        </div>
        {formik.values.type !== "any" && (
          <div>
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
          </div>
        )}
      </RadioGroup>
      {formik.values.type !== "any" &&
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
              <Grid item sm={4}>
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
      <Grid container spacing={1}>
        <Grid item sm={9} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Contact"
            name="contact"
            value={formik.values.contact}
            onChange={formik.handleChange}
            error={formik.touched.contact && Boolean(formik.errors.contact)}
          />
        </Grid>
        <Grid item sm={3} style={{ marginBottom: "1rem" }}>
          <TextField
            size="medium"
            fullWidth
            variant="outlined"
            label="Number"
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            error={formik.touched.number && Boolean(formik.errors.number)}
          ></TextField>
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

export default FormCreatePost;
