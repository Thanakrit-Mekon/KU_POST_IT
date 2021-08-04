import {
    Typography,
    TextField,
    Grid,
    Button,
    Box,
    makeStyles,
    createStyles,
} from "@material-ui/core";

import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect } from "react";
import axios from "../../axios";

const validationSchema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    phone: yup.number().required(),
});

const useStyles = makeStyles(() =>
  createStyles({
    bgyellow:{
        color: 'white',
        backgroundColor: '#F9A41A',
        borderColor: '#F9A41A',
        '&:hover': {
            backgroundColor: '#D98804',
            borderColor: '#D98804',
        },
    },

    outlinedred:{
        color: '#E53935',
        borderColor: '#E53935',
        '&:hover': {
            color: '#B71C1C',
            backgroundColor: '#F9F9F9',
            borderColor: '#B71C1C',
            
        },
    },
  })
);
  
function TeacherProfileForm(): JSX.Element {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            faculty: "",
            department: "",
        },
        validationSchema,
        onSubmit: (values) => {
            const userData = {
                first_name: values.firstName,
                last_name: values.lastName,
                phone: values.phone,
            };
            console.log(userData);
            axios
                .patch("/user/updateuser", userData)
                .then(function (response) {
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                });
        },
    });

    useEffect(() => {
        axios.get("/user/getuser").then((response) => {
            console.log(response.data);
        });
    }, []);

    return (
        <>
            <Typography
            align="left"
            variant="h5"
            style={{ paddingBottom: "1rem" }}
            >
            <Box fontWeight="fontWeightBold">Information</Box>
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="First Name"
                            variant="outlined"
                            name="firstName"
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Last Name"
                            variant="outlined"
                            name="lastName"
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item sm={12} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Tel"
                            variant="outlined"
                            name="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Faculty"
                            variant="outlined"
                            name="faculty"
                            value={formik.values.faculty}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                        </Grid>
                        <Grid item sm={6} style={{ marginBottom: "1rem" }}>
                        <TextField
                            size="small"
                            label="Department"
                            variant="outlined"
                            name="department"
                            value={formik.values.department}
                            onChange={formik.handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                </Grid>
                <Box 
                    style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"flex-end",
                    }}
                >
                    <Button
                        variant="outlined"
                        size="large"
                        className={classes.outlinedred}
                        style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        href="/"
                    >
                        Back To Home
                    </Button>
                    <Button
                        variant="outlined"
                        size="large"
                        className={classes.bgyellow}
                        style={{ marginBottom: "1rem", marginRight: "1rem" }}
                        href="/changepassword"
                    >
                        Change Password
                    </Button>
                    <Button
                        variant="contained"
                        size="large"
                        color="primary"
                        type="submit"
                        style={{ marginBottom: "1rem" }}
                    >
                        Save Change
                    </Button>
                </Box>
            </form>
        </>
    );
}
  
  export default TeacherProfileForm;
  